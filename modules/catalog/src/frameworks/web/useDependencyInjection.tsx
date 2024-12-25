import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";
import { Guard } from "@clean-architecture/shared-kernel";

import { QuoteEntityGateway } from "../../adapters/QuoteEntityGateway";

type DependencyInjectionContextValue = {
	readonly quoteEntityGateway: QuoteEntityGateway;
};

const DependencyInjectionContext =
	createContext<DependencyInjectionContextValue | null>(null);

// TODO: add data source as props to enable test vs. real host
type DependencyInjectionProps = PropsWithChildren;

const CONTEXT_VALUE: DependencyInjectionContextValue = {
	quoteEntityGateway: new QuoteEntityGateway(),
};

export const DependencyInjection = ({ children }: DependencyInjectionProps) => {
	return (
		<DependencyInjectionContext.Provider value={CONTEXT_VALUE}>
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
