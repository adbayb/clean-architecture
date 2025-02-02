import type {
	Presenter,
	PresenterFactory,
} from "@clean-architecture/shared-kernel";

import type { GetProductOutputData } from "../useCases/GetProductUseCase";
import type { GetProductViewModel } from "./GetProductViewModel";

export type GetProductPresenter = Presenter<GetProductOutputData>;

export const createGetProductPresenter: PresenterFactory<
	GetProductPresenter,
	GetProductOutputData,
	GetProductViewModel
> = (onViewModelChange) => {
	return {
		error(input) {
			onViewModelChange({
				error: input,
			});
		},
		ok(input) {
			onViewModelChange({
				data: input.content,
			});
		},
	};
};
