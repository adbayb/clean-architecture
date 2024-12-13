import { failure, success } from "@open-vanilla/result";

import type { ViewModel } from "./ViewModel";
import { UseCaseInteractor } from "./UseCase";
import type { ResponseModel } from "./ResponseModel";
import type { RequestModel } from "./RequestModel";
import { Presenter } from "./Presenter";
import { Controller } from "./Controller";

export { Entity } from "./Entity";
export { ValueObject } from "./ValueObject";
export type { Result } from "./Result";
export { failure, success } from "./Result";
export { UseCaseInteractor } from "./UseCase";
export { Controller } from "./Controller";
export { Presenter } from "./Presenter";

type GetQuoteRequestModel = RequestModel<{
	id: string;
}>;

type GetQuoteResponseModel = ResponseModel<{
	content: string;
}>;

type GetQuoteViewModel = ViewModel<{
	data?: string;
	error?: Error;
}>;

class GetQuoteUseCase extends UseCaseInteractor<
	GetQuoteRequestModel,
	GetQuoteResponseModel
> {
	public override execute(requestModel: GetQuoteRequestModel) {
		this.presenter.ok(
			success({
				content: `Hello world ${JSON.stringify(requestModel)}`,
			}),
		);

		this.presenter.error(
			failure(
				new Error(
					`An error occurred ${JSON.stringify(requestModel)} (to be replaced with Result output)`,
				),
			),
		);
	}
}

class GetQuotePresenter extends Presenter<
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

class GetQuoteController extends Controller<GetQuoteRequestModel> {}

// Drafted control flow following [Clean architecture diagram (from the book)](https://i.sstatic.net/K44FQ.jpg):
const presenter = new GetQuotePresenter({}, console.log);
const useCase = new GetQuoteUseCase(presenter);
const controller = new GetQuoteController(useCase);

void controller.execute({ id: "test" });
