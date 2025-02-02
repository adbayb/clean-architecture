import type {
	Controller,
	ControllerFactory,
} from "@clean-architecture/shared-kernel";

import type { GetProductInputData } from "../useCases/GetProductUseCase";

export type GetProductController = Controller<GetProductInputData>;

export const createGetProductController: ControllerFactory<
	GetProductController,
	GetProductInputData
> = (useCase) => {
	return {
		async execute(input) {
			return useCase.execute(input);
		},
	};
};
