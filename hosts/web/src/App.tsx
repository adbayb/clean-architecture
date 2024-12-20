import {
	DependencyInjection as CatalogDependencyInjection,
	QuoteEntityGateway,
} from "@clean-architecture/catalog";

import { GetQuote } from "./GetQuote";

export const App = () => {
	return (
		<CatalogDependencyInjection
			quoteEntityGateway={new QuoteEntityGateway()}
		>
			<GetQuote />
		</CatalogDependencyInjection>
	);
};
