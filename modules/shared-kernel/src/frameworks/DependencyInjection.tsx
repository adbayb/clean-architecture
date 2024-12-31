import { createContext, useContext, useMemo } from "react";
import type { Context, PropsWithChildren } from "react";

import type { EntityGateway } from "../entities/EntityGateway";
import { Guard } from "../core/Guard";

type DependencyInjectionContextValue<Gateway extends EntityGateway> = {
	readonly entityGateway: Gateway;
};

const DependencyInjectionContext =
	createContext<DependencyInjectionContextValue<EntityGateway> | null>(null);

type DependencyInjectionProps<Gateway extends EntityGateway> =
	PropsWithChildren<DependencyInjectionContextValue<Gateway>>;

export const DependencyInjection = <Gateway extends EntityGateway>({
	children,
	entityGateway,
}: DependencyInjectionProps<Gateway>) => {
	const value = useMemo<DependencyInjectionContextValue<Gateway>>(() => {
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

export const useDependencyInjection = <Gateway extends EntityGateway>() => {
	const contextValue = useContext(
		DependencyInjectionContext as Context<DependencyInjectionContextValue<Gateway> | null>,
	);

	const guardOutput = Guard.mustBeDefinedAndNonNull(contextValue);

	if (guardOutput.type === "failure") {
		throw guardOutput.payload;
	}

	return guardOutput.payload;
};
