import type { Result } from "@open-vanilla/result";

import type { ViewModel } from "./ViewModel";
import type { UseCaseOutputPort } from "./UseCase";
import type { DataTransferObject } from "./DataTransferObject";

/**
 * A presenter maps data structures returned by the use case interactor into data structures most convenient for the view.
 * The presenter implements the `UseCaseOutputPort` following the clean architecture [diagram](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
 * @param responseModel
 * @example
 */
export abstract class Presenter<
	ResponseModel extends Result<unknown>,
	ViewModelValue extends DataTransferObject,
> implements UseCaseOutputPort<ResponseModel>
{
	public constructor(private readonly viewModel: ViewModel<ViewModelValue>) {}

	private setViewModelValue(responseModel: ResponseModel) {
		this.viewModel.value = this.toViewModelValue(responseModel);
	}

	public error(responseModel: ResponseModel) {
		if (responseModel.type !== "failure") {
			throw new RangeError(
				"Attempting to convert a success result into an error view model value",
			);
		}

		this.setViewModelValue(responseModel);
	}

	public ok(responseModel: ResponseModel) {
		if (responseModel.type !== "success") {
			throw new RangeError(
				"Attempting to convert a failure result into a success view model value",
			);
		}

		this.setViewModelValue(responseModel);
	}

	public abstract toViewModelValue(
		responseModel: ResponseModel,
	): ViewModelValue;
}
