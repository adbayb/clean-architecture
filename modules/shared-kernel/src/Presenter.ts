import type { ViewModel } from "./ViewModel";
import type { UseCaseOutputPort } from "./UseCase";

/**
 * A presenter maps data structures returned by the use case interactor into data structures most convenient for the view.
 * The presenter implements the `UseCaseOutputPort` following the clean architecture [diagram](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
 * @param responseModel
 * @example
 */
export abstract class Presenter<ResponseModel, ViewModelValue>
	implements UseCaseOutputPort<ResponseModel>
{
	public constructor(private readonly viewModel: ViewModel<ViewModelValue>) {}

	private setViewModelValue(responseModel: ResponseModel) {
		this.viewModel.value = this.toViewModelValue(responseModel);
	}

	public error(responseModel: ResponseModel) {
		this.setViewModelValue(responseModel);
	}

	public ok(responseModel: ResponseModel) {
		this.setViewModelValue(responseModel);
	}

	public abstract toViewModelValue(
		responseModel: ResponseModel,
	): ViewModelValue;
}
