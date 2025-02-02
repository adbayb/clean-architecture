/* eslint-disable import-x/no-namespace */
import * as Catalog from "@clean-architecture/catalog";

export const Main = () => {
	return (
		<Catalog.DependencyInjection>
			<Catalog.GetProductView />
		</Catalog.DependencyInjection>
	);
};
