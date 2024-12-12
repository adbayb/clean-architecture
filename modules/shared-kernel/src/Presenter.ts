import type { UseCaseOutputPort } from "./UseCase";

/**
 * A presenter maps data structures returned by the use case interactor into data structures most convenient for the view.
 * The presenter implements the `UseCaseOutputPort` following the clean architecture [diagram](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
 */
export abstract class Presenter<ResponseModel, ViewModel>
	implements UseCaseOutputPort<ResponseModel>
{
	public constructor(
		private readonly onSetViewModel: (viewModel: ViewModel) => void,
	) {
		this.onSetViewModel = onSetViewModel;
	}

	public onViewModelChange(responseModel: ResponseModel) {
		this.onSetViewModel(this.toViewModel(responseModel));
	}

	public abstract toViewModel(responseModel: ResponseModel): ViewModel;

	public abstract empty(): void;

	public abstract fail(message: string): void;

	public abstract ok(responseModel: ResponseModel): void;
}
