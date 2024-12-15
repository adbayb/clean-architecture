import { success } from "@clean-architecture/shared-kernel";
import type { IdValueObject } from "@clean-architecture/shared-kernel";

import type { QuoteEntityGatewayPort } from "../entities/QuoteEntityGatewayPort";
import { QuoteEntity } from "../entities/QuoteEntity";
import { AuthorValueObject } from "../entities/AuthorValueObject";

export class QuoteEntityGateway implements QuoteEntityGatewayPort {
	public async getMany() {
		await Promise.resolve();

		return success([]);
	}

	public async getOne(id: IdValueObject) {
		await Promise.resolve();

		// TODO: refacto to be internalized inside the QuoteEntity (to prevent anemic model)
		const author = AuthorValueObject.create({
			firstName: "test",
			lastName: "test",
		});

		if (author.type === "failure") return author;

		return QuoteEntity.create(id, author.payload, "Fake content");
	}
}
