import { GetProductsView, ProductEntityGatewayProvider } from "@clean-architecture/catalog";
import { Button, ChakraProvider, chakraDefaultSystem } from "@clean-architecture/shared";

export const Main = () => {
	return (
		<ChakraProvider value={chakraDefaultSystem}>
			<ProductEntityGatewayProvider>
				<GetProductsView
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
			</ProductEntityGatewayProvider>
		</ChakraProvider>
	);
};
