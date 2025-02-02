import type {
	UseCaseInputData,
	UseCaseInteractor,
	UseCaseInteractorFactory,
	UseCaseOutputData,
} from "@clean-architecture/shared-kernel";

import type { ProductEntityGatewayBoundary } from "../../Product";

export type GetProductInputData = UseCaseInputData<{
	id: string;
}>;

export type GetProductOutputData = UseCaseOutputData<{
	content: string;
}>;

export type GetProductInteractor = UseCaseInteractor<GetProductInputData>;

export const createGetProductInteractor: UseCaseInteractorFactory<
	GetProductInteractor,
	GetProductInputData,
	GetProductOutputData,
	ProductEntityGatewayBoundary
> = (entityGateway, presenter) => {
	return {
		async execute(input) {
			const entityGatewayResult = await entityGateway.getOne(input.id);

			if (entityGatewayResult.type === "failure") {
				presenter.error(entityGatewayResult.payload);
			} else {
				presenter.ok({ content: entityGatewayResult.payload.content });
			}
		},
	};
};
