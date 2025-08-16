export type {
	ProductEntity,
	ProductEntityGatewayBoundary,
} from "./entities/ProductEntity";

export { createProductEntityGateway } from "./adapters/ProductEntityGateway";
export {
	ProductEntityGatewayProvider,
	useProductEntityGateway,
} from "./frameworks/ProductEntityGatewayProvider";
