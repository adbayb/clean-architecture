import type { PropsWithChildren } from "react";
import {
	DependencyInjection as SharedDependencyInjection,
	useDependencyInjection as useSharedDependencyInjection,
} from "@clean-architecture/shared-kernel";

import { createProductsDummyJsonDataSource } from "../../Product/frameworks/DummyJsonDataSource";
import { createProductEntityGateway } from "../../Product";
import type { ProductEntityGatewayBoundary } from "../../Product";

type DependencyInjectionProps = PropsWithChildren;

export const DependencyInjection = ({ children }: DependencyInjectionProps) => {
	return (
		<SharedDependencyInjection
			entityGateway={createProductEntityGateway(
				createProductsDummyJsonDataSource(),
			)}
		>
			{children}
		</SharedDependencyInjection>
	);
};

export const useDependencyInjection =
	useSharedDependencyInjection<ProductEntityGatewayBoundary>;
