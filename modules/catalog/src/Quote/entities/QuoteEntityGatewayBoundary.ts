import type {
	EntityGatewayBoundary,
	Result,
} from "@clean-architecture/shared-kernel";

import type { QuoteEntity, QuoteEntityFactoryInput } from "./QuoteEntity";

export type QuoteEntityGatewayBoundary = EntityGatewayBoundary<{
	getMany: () => Promise<Result<QuoteEntity[]>>;
	getOne: (id: string) => Promise<Result<QuoteEntity>>;
	toEntity: (input: QuoteEntityFactoryInput) => Result<QuoteEntity>;
}>;
