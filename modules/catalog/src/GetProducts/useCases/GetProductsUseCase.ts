import type {
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
	},
	Error
>[];

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
			const presenterInput: GetProductsOutputData = [];

			results.forEach(({ payload, type }) => {
				if (type === "failure") {
					presenterInput.push({ payload, type: "failure" });
				} else {
					presenterInput.push({
						payload: {
							title: payload.title,
							brand: payload.brand,
							price: payload.price.value,
							thumbnail: payload.thumbnail,
						},
						type: "success",
					});
				}
			});

			presenter.display(presenterInput);
		},
	};
};
