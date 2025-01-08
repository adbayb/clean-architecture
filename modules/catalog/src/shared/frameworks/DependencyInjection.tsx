import type { PropsWithChildren } from "react";
import {
	DependencyInjection as SharedDependencyInjection,
	useDependencyInjection as useSharedDependencyInjection,
} from "@clean-architecture/shared-kernel";

import { QuoteEntityGateway } from "../../Quote";

type DependencyInjectionProps = PropsWithChildren;

export const DependencyInjection = ({ children }: DependencyInjectionProps) => {
	return (
		<SharedDependencyInjection entityGateway={new QuoteEntityGateway()}>
			{children}
		</SharedDependencyInjection>
	);
};

export const useDependencyInjection =
	useSharedDependencyInjection<QuoteEntityGateway>;
