/* eslint-disable import-x/no-namespace */
import {
	ChakraProvider,
	chakraDefaultSystem,
} from "@clean-architecture/shared-kernel";
import * as Catalog from "@clean-architecture/catalog";

export const Main = () => {
	return (
		<ChakraProvider value={chakraDefaultSystem}>
			<Catalog.DependencyInjection>
				<Catalog.GetProductsView />
			</Catalog.DependencyInjection>
		</ChakraProvider>
	);
};
