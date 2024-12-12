import { failure, success } from "@open-vanilla/result";
import type { Result } from "@open-vanilla/result";

import { ViewModel } from "./ViewModel";
import { UseCaseInteractor } from "./UseCase";
import { Presenter } from "./Presenter";
import type { DataTransferObject } from "./DataTransferObject";
import { Controller } from "./Controller";

export type { DataTransferObject } from "./DataTransferObject";
export { Entity } from "./Entity";
export { ValueObject } from "./ValueObject";
export type { Result } from "./Result";
export { failure, success } from "./Result";
export { UseCaseInteractor } from "./UseCase";
export { Controller } from "./Controller";
export { Presenter } from "./Presenter";

type GetQuoteRequestModel = DataTransferObject<{
	id: string;
}>;

type GetQuoteResponseModel = Result<{
	content: string;
}>;

type GetQuoteViewModelValue = {
	data?: string;
	error?: Error;
};

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
	GetQuoteViewModelValue
> {
	public override toViewModelValue(
		responseModel: GetQuoteResponseModel,
	): GetQuoteViewModelValue {
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
const viewModel = new ViewModel<GetQuoteViewModelValue>({}, console.log);
const presenter = new GetQuotePresenter(viewModel);
const useCase = new GetQuoteUseCase(presenter);
const controller = new GetQuoteController(useCase);

void controller.execute({ id: "test" });
