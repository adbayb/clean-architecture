import type { PropsWithChildren } from "react";
import {
	DependencyInjection,
	useDependencyInjection,
} from "@clean-architecture/shared-kernel";

import type { ProductEntityGatewayBoundary } from "../entities/ProductEntity";
import { createProductEntityGateway } from "../adapters/ProductEntityGateway";
import { createProductsDummyJsonDataSource } from "./DummyJsonDataSource";

type ProductEntityGatewayProviderProps = PropsWithChildren;

export const ProductEntityGatewayProvider = ({
	children,
}: ProductEntityGatewayProviderProps) => {
	return (
		<DependencyInjection
			entityGateway={createProductEntityGateway(
				createProductsDummyJsonDataSource(),
			)}
		>
			{children}
		</DependencyInjection>
	);
};

export const useProductEntityGateway =
	useDependencyInjection<ProductEntityGatewayBoundary>;
