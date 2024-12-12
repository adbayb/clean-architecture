import { UseCaseInteractor } from "./UseCase";
import { Presenter } from "./Presenter";
import { Controller } from "./Controller";

type GetQuoteRequestModel = {
	id: string;
};

type GetQuoteResponseModel = {
	content: string;
};

type GetQuoteViewModel = GetQuoteResponseModel;

class GetQuoteUseCase extends UseCaseInteractor<
	GetQuoteRequestModel,
	GetQuoteResponseModel
> {
	public override execute(requestModel: GetQuoteRequestModel) {
		this.presenter.ok({
			content: `Hello world ${JSON.stringify(requestModel)}`,
		});
	}
}

class GetQuotePresenter extends Presenter<
	GetQuoteResponseModel,
	GetQuoteViewModel
> {
	public override toViewModel(
		responseModel: GetQuoteResponseModel,
	): GetQuoteResponseModel {
		return responseModel;
	}

	public override empty(): void {
		throw new Error("Method not implemented.");
	}

	public override fail(_: string): void {
		throw new Error("Method not implemented.");
	}

	public override ok(responseModel: GetQuoteResponseModel): void {
		this.onViewModelChange(responseModel);
	}
}

class GetQuoteController extends Controller<GetQuoteRequestModel> {}

// Drafted control flow following [Clean architecture diagram (from the book)](https://i.sstatic.net/K44FQ.jpg):
const presenter = new GetQuotePresenter(console.log);
const useCase = new GetQuoteUseCase(presenter);
const controller = new GetQuoteController(useCase);

void controller.execute({ id: "test" });
