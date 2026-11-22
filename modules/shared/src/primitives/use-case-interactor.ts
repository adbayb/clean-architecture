import type { EntityGatewayBoundary } from "./entity";
import type { UseCaseInputBoundary } from "./use-case-input-boundary";
import type { UseCaseInputData } from "./use-case-input-data";
import type { UseCaseOutputBoundary } from "./use-case-output-boundary";
import type { UseCaseOutputData } from "./use-case-output-data";

export type UseCaseInteractor<InputData extends UseCaseInputData> = UseCaseInputBoundary<InputData>;

export type UseCaseInteractorFactory<
	Output extends UseCaseInteractor<InputData>,
	InputData extends UseCaseInputData,
	OutputData extends UseCaseOutputData | UseCaseOutputData[],
	EntityGateway extends EntityGatewayBoundary,
> = (entityGateway: EntityGateway, presenter: UseCaseOutputBoundary<OutputData>) => Output;
