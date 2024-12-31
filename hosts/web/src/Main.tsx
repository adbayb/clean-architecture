/* eslint-disable import-x/no-namespace */
import { DependencyInjection } from "@clean-architecture/shared-kernel";
import * as Catalog from "@clean-architecture/catalog";

export const Main = () => {
	return (
		<DependencyInjection entityGateway={new Catalog.QuoteEntityGateway()}>
			<Catalog.GetQuoteView />
		</DependencyInjection>
	);
};
