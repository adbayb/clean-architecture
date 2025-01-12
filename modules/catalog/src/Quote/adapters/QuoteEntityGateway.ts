import { success } from "@clean-architecture/shared-kernel";

import type { QuoteEntityGatewayBoundary } from "../entities/QuoteEntityGatewayBoundary";
import { QuoteEntity } from "../entities/QuoteEntity";

export class QuoteEntityGateway implements QuoteEntityGatewayBoundary {
	public async getMany() {
		await Promise.resolve();

		return success([]);
	}

	public async getOne(id: string) {
		const dataSourceOutput = await Promise.resolve({
			id,
			content: "Fake content",
			fullName: "Test Test",
		});

		return QuoteEntity.create(dataSourceOutput);
	}
}
