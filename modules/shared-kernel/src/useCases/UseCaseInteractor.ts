import type { EntityGatewayBoundary } from "../entities/Entity";
import type { UseCaseOutputData } from "./UseCaseOutputData";
import type { UseCaseOutputBoundary } from "./UseCaseOutputBoundary";
import type { UseCaseInputData } from "./UseCaseInputData";
import type { UseCaseInputBoundary } from "./UseCaseInputBoundary";

export type UseCaseInteractor<InputData extends UseCaseInputData> =
	UseCaseInputBoundary<InputData>;

export type UseCaseInteractorFactory<
	Output extends UseCaseInteractor<InputData>,
	InputData extends UseCaseInputData,
	OutputData extends UseCaseOutputData | UseCaseOutputData[],
	EntityGateway extends EntityGatewayBoundary,
> = (
	entityGateway: EntityGateway,
	presenter: UseCaseOutputBoundary<OutputData>,
) => Output;
