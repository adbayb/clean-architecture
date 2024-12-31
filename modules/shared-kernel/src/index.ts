/** Domain-related shared interfaces. */
export { Entity } from "./entities/Entity";
export type { EntityGateway } from "./entities/EntityGateway";
export { IdValueObject } from "./entities/IdValueObject";
export type { GetValueFromValueObject } from "./entities/ValueObject";
export { ValueObject } from "./entities/ValueObject";

/** Application-related shared interfaces. */
export type { UseCaseInputData } from "./useCases/UseCaseInputData";
export type { UseCaseOutputData } from "./useCases/UseCaseOutputData";
export { UseCaseInteractor } from "./useCases/UseCaseInteractor";

/** Infrastructure-related shared interfaces. */
export { Controller } from "./adapters/Controller";
export { Presenter } from "./adapters/Presenter";
export type { ViewModel } from "./adapters/ViewModel";

/** Framework/Driver-related shared interfaces. */
export {
	DependencyInjection,
	useDependencyInjection,
} from "./frameworks/DependencyInjection";
export type { Hook } from "./frameworks/Hook";

/** Core shared interfaces (uncategorized). */
export { Guard } from "./core/Guard";
export { failure, success } from "./core/Result";
export type { Result } from "./core/Result";
