import type {
	Presenter,
	PresenterFactory,
} from "@clean-architecture/shared-kernel";

import type { GetProductsOutputData } from "../useCases/GetProductsUseCase";
import type { GetProductsViewModel } from "./GetProductsViewModel";

export type GetProductsPresenter = Presenter<GetProductsOutputData>;

export const createGetProductsPresenter: PresenterFactory<
	GetProductsPresenter,
	GetProductsOutputData,
	GetProductsViewModel
> = (onViewModelChange) => {
	return {
		error(input) {
			onViewModelChange({
				error: input,
			});
		},
		ok(input) {
			onViewModelChange({
				data: input,
			});
		},
	};
};
