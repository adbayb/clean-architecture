import { Presenter } from "@clean-architecture/shared-kernel";

import type { GetQuoteResponseModel } from "../useCases/GetQuoteUseCase";
import type { GetQuoteViewModel } from "./GetQuoteViewModel";

export class GetQuotePresenter extends Presenter<
	GetQuoteResponseModel,
	GetQuoteViewModel
> {
	public override toViewModel(
		responseModel: GetQuoteResponseModel,
	): GetQuoteViewModel {
		if (responseModel.type === "failure") {
			return {
				error: responseModel.payload,
			};
		}

		return {
			data: responseModel.payload.content,
		};
	}
}
