import type { UseCaseInputPort } from "./UseCase";

export abstract class Controller<RequestModel> {
	// Controller must have no reference to presenter to prevent coupling between both different object and allow more easier interchangeability (using another presenter with the same controller context for example)
	public constructor(
		private readonly useCase: UseCaseInputPort<RequestModel>,
	) {
		this.useCase = useCase;
	}

	public async execute(requestModel: RequestModel) {
		await this.useCase.execute(requestModel);
	}
}
