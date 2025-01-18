/** Domain-related shared interfaces. */
export type { Entity } from "./entities/Entity";
export { createEntityFactory } from "./entities/Entity";
export type { EntityGatewayBoundary } from "./entities/EntityGatewayBoundary";
export type { ValueObject } from "./entities/ValueObject";
export { createValueObjectFactory } from "./entities/ValueObject";
export type { IdValueObject } from "./entities/IdValueObject";
export { createIdValueObject } from "./entities/IdValueObject";

/** Application-related shared interfaces. */
export type { UseCaseInputData } from "./useCases/UseCaseInputData";
export type { UseCaseOutputData } from "./useCases/UseCaseOutputData";
export type {
	UseCaseInteractor,
	UseCaseInteractorFactory,
} from "./useCases/UseCaseInteractor";

/** Infrastructure-related shared interfaces. */
export type { Controller, ControllerFactory } from "./adapters/Controller";
export type { Presenter, PresenterFactory } from "./adapters/Presenter";
export type { ViewModel } from "./adapters/ViewModel";

/** Framework/Driver-related shared interfaces. */
export {
	DependencyInjection,
	useDependencyInjection,
} from "./frameworks/DependencyInjection";
export type { Hook } from "./frameworks/Hook";

/** Uncategorized shared interfaces. */
export { Guard } from "./Guard";
export { failure, success } from "./Result";
export type { Result } from "./Result";
