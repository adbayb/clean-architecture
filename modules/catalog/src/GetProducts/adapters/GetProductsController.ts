import type {
	Controller,
	ControllerFactory,
} from "@clean-architecture/shared-kernel";

import type { GetProductsInputData } from "../useCases/GetProductsUseCase";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
export type GetProductsController = Controller<GetProductsInputData>;

export const createGetProductsController: ControllerFactory<
	GetProductsController,
	GetProductsInputData
> = (useCase) => {
	return {
		async execute() {
			// TODO: undefined instead if no parameter?
			return useCase.execute({});
		},
	};
};
