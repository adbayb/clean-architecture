import type { ViewModel } from "./ViewModel";
import type { UseCaseOutputPort } from "./UseCase";
import type { ResponseModel } from "./ResponseModel";

/**
 * A presenter maps data structures returned by the use case interactor into data structures most convenient for the view.
 * The presenter implements the `UseCaseOutputPort` following the clean architecture [diagram](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
 * @param responseModel
 * @example
 */
export abstract class Presenter<
	RM extends ResponseModel<unknown>,
	VM extends ViewModel,
> implements UseCaseOutputPort<RM>
{
	public constructor(private readonly onViewModelChange: (vm: VM) => void) {}

	public abstract toViewModel(responseModel: RM): VM;

	private setViewModel(responseModel: RM) {
		this.onViewModelChange(this.toViewModel(responseModel));
	}

	public error(responseModel: RM) {
		if (responseModel.type !== "failure") {
			throw new RangeError(
				"Attempting to convert a success result into an error view model value",
			);
		}

		this.setViewModel(responseModel);
	}

	public ok(responseModel: RM) {
		if (responseModel.type !== "success") {
			throw new RangeError(
				"Attempting to convert a failure result into a success view model value",
			);
		}

		this.setViewModel(responseModel);
	}
}
