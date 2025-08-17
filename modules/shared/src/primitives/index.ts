/** Domain-related shared interfaces. */
export type { Entity, EntityGatewayBoundary } from "./Entity";
export { createEntityFactory } from "./Entity";
export type { ValueObject } from "./ValueObject";
export { createValueObjectFactory } from "./ValueObject";

/** Application-related shared interfaces. */
export type { UseCaseInputData } from "./UseCaseInputData";
export type { UseCaseOutputData } from "./UseCaseOutputData";
export type {
	UseCaseInteractor,
	UseCaseInteractorFactory,
} from "./UseCaseInteractor";

/** Infrastructure-related shared interfaces. */
export type { DataSourceBoundary, EntityGatewayFactory } from "./EntityGateway";
export type { Controller, ControllerFactory } from "./Controller";
export type { Presenter, PresenterFactory } from "./Presenter";
export type { ViewModel } from "./ViewModel";

/** Framework/Driver-related shared interfaces. */
export {
	DependencyInjection,
	useDependencyInjection,
} from "./DependencyInjection";
export type { Hook } from "./Hook";
export { createNetworkDataSourceFactory } from "./DataSource";

/** Uncategorized shared interfaces. */
export type { DataTransferObject } from "./DataTransferObject";
export { Guard } from "./Guard";
export type { Mapper } from "./Mapper";
export { failure, success } from "./Result";
export type { Result } from "./Result";
