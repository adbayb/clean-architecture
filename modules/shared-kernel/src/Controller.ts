import type { UseCaseInputPort } from "./UseCase";
import type { RequestModel } from "./RequestModel";

export abstract class Controller<Model extends RequestModel> {
	// Controller must have no reference to presenter to prevent coupling between both different object and allow more easier interchangeability (using another presenter with the same controller context for example)
	public constructor(private readonly useCase: UseCaseInputPort<Model>) {}

	public async execute(requestModel: Model) {
		await this.useCase.execute(requestModel);
	}
}
