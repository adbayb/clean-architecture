import type {
	Presenter,
	PresenterFactory,
} from "@clean-architecture/shared-kernel";

import type { GetQuoteOutputData } from "../useCases/GetQuoteUseCase";
import type { GetQuoteViewModel } from "./GetQuoteViewModel";

export type GetQuotePresenter = Presenter<GetQuoteOutputData>;

export const createGetQuotePresenter: PresenterFactory<
	GetQuotePresenter,
	GetQuoteOutputData,
	GetQuoteViewModel
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
