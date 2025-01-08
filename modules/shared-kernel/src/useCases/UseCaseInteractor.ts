import type { EntityGatewayBoundary } from "../entities/EntityGatewayBoundary";
import type { UseCaseOutputData } from "./UseCaseOutputData";
import type { UseCaseOutputBoundary } from "./UseCaseOutputBoundary";
import type { UseCaseInputData } from "./UseCaseInputData";
import type { UseCaseInputBoundary } from "./UseCaseInputBoundary";

export abstract class UseCaseInteractor<
	InputData extends UseCaseInputData,
	OutputData extends UseCaseOutputData,
	EntityGateway extends EntityGatewayBoundary,
> implements UseCaseInputBoundary<InputData>
{
	public constructor(
		protected readonly entityGateway: EntityGateway,
		protected readonly presenter: UseCaseOutputBoundary<OutputData>,
	) {}

	public abstract execute(input: InputData): Promise<void> | void;
}
