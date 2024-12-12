import { ViewModel } from "./ViewModel";
import { UseCaseInteractor } from "./UseCase";
import { Presenter } from "./Presenter";
import { Controller } from "./Controller";

export { Entity } from "./Entity";
export { ValueObject } from "./ValueObject";
export { Result } from "./Result";
export { UseCaseInteractor } from "./UseCase";
export { Controller } from "./Controller";
export { Presenter } from "./Presenter";

type GetQuoteRequestModel = {
	id: string;
};

type GetQuoteResponseModel =
	| Error
	| {
			content: string;
	  };

type GetQuoteViewModelValue = GetQuoteResponseModel;

class GetQuoteUseCase extends UseCaseInteractor<
	GetQuoteRequestModel,
	GetQuoteResponseModel
> {
	public override execute(requestModel: GetQuoteRequestModel) {
		this.presenter.ok({
			content: `Hello world ${JSON.stringify(requestModel)}`,
		});

		this.presenter.error(
			new Error(
				`An error occurred ${JSON.stringify(requestModel)} (to be replaced with Result output)`,
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
		return responseModel;
	}
}

class GetQuoteController extends Controller<GetQuoteRequestModel> {}

// Drafted control flow following [Clean architecture diagram (from the book)](https://i.sstatic.net/K44FQ.jpg):
const viewModel = new ViewModel<GetQuoteViewModelValue>(
	{ content: "initial" },
	console.log,
);

const presenter = new GetQuotePresenter(viewModel);
const useCase = new GetQuoteUseCase(presenter);
const controller = new GetQuoteController(useCase);

void controller.execute({ id: "test" });
