import { success } from "@clean-architecture/shared-kernel";
import type {
	EntityGateway,
	IdValueObject,
} from "@clean-architecture/shared-kernel";

import { QuoteEntity } from "./QuoteEntity";

export class QuoteEntityGateway implements EntityGateway<QuoteEntity> {
	public async getMany() {
		await Promise.resolve();

		return success([]);
	}

	public async getOne(id: IdValueObject) {
		await Promise.resolve();

		return QuoteEntity.create(id, "Fake content");
	}
}
