import type {
	UseCaseInputData,
	UseCaseInteractor,
	UseCaseInteractorFactory,
	UseCaseOutputData,
} from "../../../../shared";
import type { ProductEntityGatewayBoundary } from "../../product/entities";

export type GetProductsInputData = UseCaseInputData;
export type GetProductsInteractor = UseCaseInteractor<GetProductsInputData>;

export type GetProductsOutputData = UseCaseOutputData<{
	title: string;
	brand: string;
	price: number;
	thumbnail: string;
}>[];

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
