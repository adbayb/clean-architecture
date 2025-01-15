import type {
	EntityGatewayBoundary,
	Result,
} from "@clean-architecture/shared-kernel";

import type { QuoteEntity } from "./QuoteEntity";

export type QuoteEntityGatewayBoundary = EntityGatewayBoundary<QuoteEntity> & {
	getMany: () => Promise<Result<QuoteEntity[]>>;
	getOne: (id: string) => Promise<Result<QuoteEntity>>;
};
