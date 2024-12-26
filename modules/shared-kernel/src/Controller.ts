import type { UseCaseInputBoundary, UseCaseInputData } from "./UseCase";

export abstract class Controller<
	InputData extends UseCaseInputData = UseCaseInputData,
> {
	// Controller must have no reference to presenter to prevent coupling between both different object and allow more easier interchangeability (using another presenter with the same controller context for example)
	public constructor(
		private readonly useCase: UseCaseInputBoundary<InputData>,
	) {}

	public async execute(input: InputData) {
		await this.useCase.execute(input);
	}
}
