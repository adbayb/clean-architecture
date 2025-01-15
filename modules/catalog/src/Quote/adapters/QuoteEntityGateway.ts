import { success } from "@clean-architecture/shared-kernel";

import type { QuoteEntityGatewayBoundary } from "../entities/QuoteEntityGatewayBoundary";
import { QuoteEntity } from "../entities/QuoteEntity";
import type { QuoteEntityCreateInput } from "../entities/QuoteEntity";

export class QuoteEntityGateway implements QuoteEntityGatewayBoundary {
	public async getMany() {
		await Promise.resolve();

		return success([]);
	}

	public async getOne(id: string) {
		// TODO: use data source interface (that can be implemented by https://dummyjson.com/ or fake concrete implementation) (interface + concrete implementations are not specific to the catalog module, can be implemented in shared kernel?)
		const dataSourceOutput = await Promise.resolve({
			id,
			content: "Fake content",
			fullName: "Test Test",
		});

		return this.toEntity(dataSourceOutput);
	}

	public toEntity(input: QuoteEntityCreateInput) {
		return QuoteEntity.create(input);
	}
}
