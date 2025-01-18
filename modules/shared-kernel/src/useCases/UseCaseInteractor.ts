import type { EntityGatewayBoundary } from "../entities/EntityGatewayBoundary";
import type { UseCaseOutputData } from "./UseCaseOutputData";
import type { UseCaseOutputBoundary } from "./UseCaseOutputBoundary";
import type { UseCaseInputData } from "./UseCaseInputData";
import type { UseCaseInputBoundary } from "./UseCaseInputBoundary";

export type UseCaseInteractor<InputData extends UseCaseInputData> =
	UseCaseInputBoundary<InputData>;

export type UseCaseInteractorFactory<
	Output extends UseCaseInteractor<InputData>,
	InputData extends UseCaseInputData,
	OutputData extends UseCaseOutputData,
	EntityGateway extends EntityGatewayBoundary,
> = (
	entityGateway: EntityGateway,
	presenter: UseCaseOutputBoundary<OutputData>,
) => Output;
