/* eslint-disable import-x/no-namespace */
import {
	Button,
	ChakraProvider,
	chakraDefaultSystem,
} from "@clean-architecture/shared-kernel";
import * as Catalog from "@clean-architecture/catalog";

export const Main = () => {
	return (
		<ChakraProvider value={chakraDefaultSystem}>
			<Catalog.ProductEntityGatewayProvider>
				<Catalog.GetProductsView
					// TODO: expose the action slot component via the bookmark module
					actionSlot={
						<Button
							onClick={() => {
								console.log("Bookmark");
							}}
							variant="solid"
						>
							Bookmark
						</Button>
					}
				/>
			</Catalog.ProductEntityGatewayProvider>
		</ChakraProvider>
	);
};
