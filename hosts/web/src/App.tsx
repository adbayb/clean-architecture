// eslint-disable-next-line import-x/no-namespace
import * as Catalog from "@clean-architecture/catalog";

export const App = () => {
	return (
		<Catalog.DependencyInjection
			quoteEntityGateway={new Catalog.QuoteEntityGateway()} // TODO: move it internally?
		>
			<Catalog.GetQuoteView />
		</Catalog.DependencyInjection>
	);
};
