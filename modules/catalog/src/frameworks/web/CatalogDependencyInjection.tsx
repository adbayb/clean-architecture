import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";
import { Guard } from "@clean-architecture/shared-kernel";

import type { QuoteEntityGateway } from "../../adapters/QuoteEntityGateway";

type CatalogDependencyInjectionContextValue = {
	readonly quoteEntityGateway: QuoteEntityGateway;
};

const CatalogDependencyInjectionContext =
	createContext<CatalogDependencyInjectionContextValue | null>(null);

type CatalogDependencyInjectionProps =
	PropsWithChildren<CatalogDependencyInjectionContextValue>;

export const CatalogDependencyInjection = ({
	children,
	...contextValue
}: CatalogDependencyInjectionProps) => {
	return (
		<CatalogDependencyInjectionContext.Provider value={contextValue}>
			{children}
		</CatalogDependencyInjectionContext.Provider>
	);
};

export const useCatalogDependencyInjection = () => {
	const contextValue = useContext(CatalogDependencyInjectionContext);
	const guardOutput = Guard.mustBeDefinedAndNonNull(contextValue);

	if (guardOutput.type === "failure") {
		throw guardOutput.payload;
	}

	return guardOutput.payload;
};
