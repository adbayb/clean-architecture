import type { Controller, ControllerFactory } from "@clean-architecture/shared";
import type { GetProductsInputData } from "../use-cases/get-products-use-case";

export type GetProductsController = Controller;

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
