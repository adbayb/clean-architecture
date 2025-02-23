import type { UseCaseOutputData } from "../useCases/UseCaseOutputData";
import type { UseCaseOutputBoundary } from "../useCases/UseCaseOutputBoundary";
import type { ViewModel } from "./ViewModel";

/**
 * A presenter maps data structures returned by the use case interactor into data structures most convenient for the view.
 * The presenter implements the `UseCaseOutputBoundary` following the clean architecture [diagram](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
 */
export type Presenter<
	OutputData extends UseCaseOutputData | UseCaseOutputData[],
> = UseCaseOutputBoundary<OutputData>;

export type PresenterFactory<
	Output extends Presenter<OutputData>,
	OutputData extends UseCaseOutputData | UseCaseOutputData[],
	Model extends ViewModel | ViewModel[],
> = (onViewModelChange: (input: Model) => void) => Output;
