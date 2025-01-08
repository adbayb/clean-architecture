import { createContext, useContext, useMemo } from "react";
import type { Context, PropsWithChildren } from "react";

import type { EntityGatewayBoundary } from "../entities/EntityGatewayBoundary";
import { Guard } from "../core/Guard";

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
		<DependencyInjectionContext.Provider value={value}>
			{children}
		</DependencyInjectionContext.Provider>
	);
};

export const useDependencyInjection = <
	EntityGateway extends EntityGatewayBoundary,
>() => {
	const contextValue = useContext(
		DependencyInjectionContext as Context<DependencyInjectionContextValue<EntityGateway> | null>,
	);

	const guardOutput = Guard.mustBeDefinedAndNonNull(contextValue);

	if (guardOutput.type === "failure") {
		throw guardOutput.payload;
	}

	return guardOutput.payload;
};
