/** Domain-related shared interfaces. */
export type { Entity, EntityGatewayBoundary } from "./entities/Entity";
export { createEntityFactory } from "./entities/Entity";
export type { ValueObject } from "./entities/ValueObject";
export { createValueObjectFactory } from "./entities/ValueObject";
export type { IdValueObject } from "./entities/IdValueObject";
export { createIdValueObject } from "./entities/IdValueObject";

/** Application-related shared interfaces. */
export type { UseCaseInputData } from "./useCases/UseCaseInputData";
export type {
	UseCaseOutputData,
	GetUseCaseOutputDataFailureType,
	GetUseCaseOutputDataSuccessType,
} from "./useCases/UseCaseOutputData";
export type {
	UseCaseInteractor,
	UseCaseInteractorFactory,
} from "./useCases/UseCaseInteractor";

/** Infrastructure-related shared interfaces. */
export type {
	DataSourceBoundary,
	EntityGatewayFactory,
} from "./adapters/EntityGateway";
export type { Controller, ControllerFactory } from "./adapters/Controller";
export type { Presenter, PresenterFactory } from "./adapters/Presenter";
export type { ViewModel } from "./adapters/ViewModel";

/** Framework/Driver-related shared interfaces. */
export {
	DependencyInjection,
	useDependencyInjection,
} from "./frameworks/DependencyInjection";
export type { Hook } from "./frameworks/Hook";
export { createNetworkDataSourceFactory } from "./frameworks/DataSource";

/** Uncategorized shared interfaces. */
export type { DataTransferObject } from "./DataTransferObject";
export { Guard } from "./Guard";
export type { Mapper } from "./Mapper";
export { failure, success } from "./Result";
export type { Result } from "./Result";
