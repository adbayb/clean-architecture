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
			if (input.type !== "failure") {
				throw new RangeError(
					"Attempting to convert a success result into an error view model value",
				);
			}

			onViewModelChange({
				error: input.payload,
			});
		},
		ok(input) {
			if (input.type !== "success") {
				throw new RangeError(
					"Attempting to convert a failure result into a success view model value",
				);
			}

			onViewModelChange({
				data: input.payload.content,
			});
		},
	};
};
