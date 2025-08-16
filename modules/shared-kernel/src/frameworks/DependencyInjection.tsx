import { createContext, use, useMemo } from "react";
import type { Context, PropsWithChildren } from "react";

import type { EntityGatewayBoundary } from "../entities/Entity";
import { Guard } from "../Guard";

type DependencyInjectionContextValue<
	EntityGateway extends EntityGatewayBoundary,
> = {
	readonly entityGateway: EntityGateway;
};

const DependencyInjectionContext =
	createContext<DependencyInjectionContextValue<EntityGatewayBoundary> | null>(
		null,
	);

type DependencyInjectionProps<Gateway extends EntityGatewayBoundary> =
	PropsWithChildren<DependencyInjectionContextValue<Gateway>>;

export const DependencyInjection = <
	EntityGateway extends EntityGatewayBoundary,
>({
	children,
	entityGateway,
}: DependencyInjectionProps<EntityGateway>) => {
	const value = useMemo<
		DependencyInjectionContextValue<EntityGateway>
	>(() => {
		return {
			entityGateway,
		};
	}, [entityGateway]);

	return (
		<DependencyInjectionContext value={value}>
			{children}
		</DependencyInjectionContext>
	);
};

export const useDependencyInjection = <
	EntityGateway extends EntityGatewayBoundary,
>() => {
	const contextValue = use(
		DependencyInjectionContext as Context<DependencyInjectionContextValue<EntityGateway> | null>,
	);

	const guardOutput = Guard.mustBeDefinedAndNonNull(contextValue);

	if (guardOutput.type === "failure") {
		throw guardOutput.payload;
	}

	return guardOutput.payload;
};
