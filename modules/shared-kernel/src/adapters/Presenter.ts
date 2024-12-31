import type { UseCaseOutputData } from "../useCases/UseCaseOutputData";
import type { UseCaseOutputBoundary } from "../useCases/UseCaseOutputBoundary";
import type { ViewModel } from "./ViewModel";

/**
 * A presenter maps data structures returned by the use case interactor into data structures most convenient for the view.
 * The presenter implements the `UseCaseOutputBoundary` following the clean architecture [diagram](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
 */
export abstract class Presenter<
	OutputData extends UseCaseOutputData,
	Model extends ViewModel,
> implements UseCaseOutputBoundary<OutputData>
{
	public constructor(
		private readonly onViewModelChange: (input: Model) => void,
	) {}

	public abstract toViewModel(input: OutputData): Model;

	private setViewModel(input: OutputData) {
		this.onViewModelChange(this.toViewModel(input));
	}

	public error(input: OutputData) {
		if (input.type !== "failure") {
			throw new RangeError(
				"Attempting to convert a success result into an error view model value",
			);
		}

		this.setViewModel(input);
	}

	public ok(input: OutputData) {
		if (input.type !== "success") {
			throw new RangeError(
				"Attempting to convert a failure result into a success view model value",
			);
		}

		this.setViewModel(input);
	}
}
