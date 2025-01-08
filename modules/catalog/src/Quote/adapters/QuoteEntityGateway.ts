import { success } from "@clean-architecture/shared-kernel";

import type { QuoteEntityGatewayBoundary } from "../entities/QuoteEntityGatewayBoundary";
import { QuoteEntity } from "../entities/QuoteEntity";

export class QuoteEntityGateway implements QuoteEntityGatewayBoundary {
	public async getMany() {
		await Promise.resolve();

		return success([]);
	}

	public async getOne(id: string) {
		await Promise.resolve();

		const fullName = "Test Test";
		const [firstName, lastName] = fullName.split(" ") as [string, string];

		return QuoteEntity.create({
			id,
			content: "Fake content",
			firstName,
			lastName,
		});
	}
}
