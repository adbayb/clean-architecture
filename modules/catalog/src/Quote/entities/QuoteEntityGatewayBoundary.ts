import type { EntityGatewayBoundary } from "@clean-architecture/shared-kernel";

import type { QuoteEntity } from "./QuoteEntity";

export type QuoteEntityGatewayBoundary = EntityGatewayBoundary<QuoteEntity>;
