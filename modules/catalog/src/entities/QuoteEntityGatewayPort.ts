import type { EntityGateway } from "@clean-architecture/shared-kernel";

import type { QuoteEntity } from "./QuoteEntity";

export type QuoteEntityGatewayPort = EntityGateway<QuoteEntity>;
