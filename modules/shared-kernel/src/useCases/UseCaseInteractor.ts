import type { EntityGateway } from "../entities/EntityGateway";
import type { UseCaseOutputData } from "./UseCaseOutputData";
import type { UseCaseOutputBoundary } from "./UseCaseOutputBoundary";
import type { UseCaseInputData } from "./UseCaseInputData";
import type { UseCaseInputBoundary } from "./UseCaseInputBoundary";

export abstract class UseCaseInteractor<
	InputData extends UseCaseInputData,
	OutputData extends UseCaseOutputData,
	Gateway extends EntityGateway,
> implements UseCaseInputBoundary<InputData>
{
	public constructor(
		protected readonly entityGateway: Gateway,
		protected readonly presenter: UseCaseOutputBoundary<OutputData>,
	) {}

	public abstract execute(input: InputData): Promise<void> | void;
}
