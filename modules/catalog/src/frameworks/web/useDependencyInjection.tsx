import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";
import { Guard } from "@clean-architecture/shared-kernel";

import type { QuoteEntityGateway } from "../../adapters/QuoteEntityGateway";

type DependencyInjectionContextValue = {
	readonly quoteEntityGateway: QuoteEntityGateway;
};

const DependencyInjectionContext =
	createContext<DependencyInjectionContextValue | null>(null);

type DependencyInjectionProps =
	PropsWithChildren<DependencyInjectionContextValue>;

export const DependencyInjection = ({
	children,
	...contextValue
}: DependencyInjectionProps) => {
	return (
		<DependencyInjectionContext.Provider value={contextValue}>
			{children}
		</DependencyInjectionContext.Provider>
	);
};

export const useDependencyInjection = () => {
	const contextValue = useContext(DependencyInjectionContext);
	const guardOutput = Guard.mustBeDefinedAndNonNull(contextValue);

	if (guardOutput.type === "failure") {
		throw guardOutput.payload;
	}

	return guardOutput.payload;
};
