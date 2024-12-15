import { success } from "@clean-architecture/shared-kernel";
import type { IdValueObject } from "@clean-architecture/shared-kernel";

import type { QuoteEntityGatewayPort } from "../entities/QuoteEntityGatewayPort";
import { QuoteEntity } from "../entities/QuoteEntity";

export class QuoteEntityGateway implements QuoteEntityGatewayPort {
	public async getMany() {
		await Promise.resolve();

		return success([]);
	}

	public async getOne(id: IdValueObject) {
		await Promise.resolve();

		return QuoteEntity.create(id, "Fake content");
	}
}
