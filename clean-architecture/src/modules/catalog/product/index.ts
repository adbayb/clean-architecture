export { createProductEntityGateway } from "./adapters/product-entity-gateway";
export type { ProductEntity, ProductEntityGatewayBoundary } from "./entities";

export {
	ProductEntityGatewayProvider,
	useProductEntityGateway,
} from "./frameworks/product-entity-gateway-provider";
