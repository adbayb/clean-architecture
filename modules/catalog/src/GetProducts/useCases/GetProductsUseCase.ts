import type {
	GetUseCaseOutputDataFailureType,
	GetUseCaseOutputDataSuccessType,
	UseCaseInputData,
	UseCaseInteractor,
	UseCaseInteractorFactory,
	UseCaseOutputData,
} from "@clean-architecture/shared-kernel";

import type { ProductEntityGatewayBoundary } from "../../Product";

export type GetProductsInputData = UseCaseInputData;

export type GetProductsOutputData = UseCaseOutputData<
	{
		title: string;
		brand: string;
		price: number;
		thumbnail: string;
	}[],
	Error[]
>;

export type GetProductsInteractor = UseCaseInteractor<GetProductsInputData>;

export const createGetProductsInteractor: UseCaseInteractorFactory<
	GetProductsInteractor,
	GetProductsInputData,
	GetProductsOutputData,
	ProductEntityGatewayBoundary
> = (entityGateway, presenter) => {
	return {
		async execute() {
			const results = await entityGateway.getMany();

			const presenterErrorOutput: GetUseCaseOutputDataFailureType<GetProductsOutputData> =
				[];

			const presenterSuccessOutput: GetUseCaseOutputDataSuccessType<GetProductsOutputData> =
				[];

			results.forEach(({ payload, type }) => {
				if (type === "failure") {
					presenterErrorOutput.push(payload);
				} else {
					presenterSuccessOutput.push({
						title: payload.title,
						brand: payload.brand,
						price: payload.price.value,
						thumbnail: payload.thumbnail,
					});
				}
			});

			/*
			 * TODO:
			 * - Simplify the presenter interface: only one single method required (display) that can display freely any kind of data structure (including error)
			 * - Update the logic to embed the error at item level to allow scoping error at item level without impacting other successful item retrievals.
			 */
			if (presenterErrorOutput.length > 0) {
				presenter.error(presenterErrorOutput);
			} else {
				presenter.ok(presenterSuccessOutput);
			}
		},
	};
};
