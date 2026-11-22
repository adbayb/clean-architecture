import { DependencyInjection, useDependencyInjection } from "@clean-architecture/shared";
import type { PropsWithChildren } from "react";
import { createProductEntityGateway } from "../adapters/product-entity-gateway";
import type { ProductEntityGatewayBoundary } from "../entities/product-entity";
import { createProductsDummyJsonDataSource } from "./dummy-json-data-source";

type ProductEntityGatewayProviderProps = PropsWithChildren;

export const ProductEntityGatewayProvider = ({ children }: ProductEntityGatewayProviderProps) => {
	return (
		<DependencyInjection
			entityGateway={createProductEntityGateway(createProductsDummyJsonDataSource())}
		>
			{children}
		</DependencyInjection>
	);
};

export const useProductEntityGateway = useDependencyInjection<ProductEntityGatewayBoundary>;
