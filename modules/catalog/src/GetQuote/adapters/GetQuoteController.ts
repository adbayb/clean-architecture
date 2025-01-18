import type {
	Controller,
	ControllerFactory,
} from "@clean-architecture/shared-kernel";

import type { GetQuoteInputData } from "../useCases/GetQuoteUseCase";

export type GetQuoteController = Controller<GetQuoteInputData>;

export const createGetQuoteController: ControllerFactory<
	GetQuoteController,
	GetQuoteInputData
> = (useCase) => {
	return {
		async execute(input) {
			return useCase.execute(input);
		},
	};
};
