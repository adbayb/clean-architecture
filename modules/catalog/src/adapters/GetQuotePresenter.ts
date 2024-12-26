import { Presenter } from "@clean-architecture/shared-kernel";

import type { GetQuoteOutputData } from "../useCases/GetQuoteUseCase";
import type { GetQuoteViewModel } from "./GetQuoteViewModel";

export class GetQuotePresenter extends Presenter<
	GetQuoteOutputData,
	GetQuoteViewModel
> {
	public override toViewModel(input: GetQuoteOutputData): GetQuoteViewModel {
		if (input.type === "failure") {
			return {
				error: input.payload,
			};
		}

		return {
			data: input.payload.content,
		};
	}
}
