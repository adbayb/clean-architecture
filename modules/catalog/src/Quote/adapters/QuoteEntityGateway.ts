import { success } from "@clean-architecture/shared-kernel";

import type { QuoteEntityGatewayBoundary } from "../entities/QuoteEntityGatewayBoundary";
import { createQuoteEntity } from "../entities/QuoteEntity";

export const QuoteEntityGateway: QuoteEntityGatewayBoundary = {
	async getMany() {
		await Promise.resolve();

		return success([]);
	},
	async getOne(id) {
		// TODO: use data source interface (that can be implemented by https://dummyjson.com/ or fake concrete implementation) (interface + concrete implementations are not specific to the catalog module, can be implemented in shared kernel?)
		const dataSourceOutput = await Promise.resolve({
			id,
			content: "Fake content",
			fullName: "Test Test",
		});

		return this.toEntity(dataSourceOutput);
	},
	toEntity(input) {
		return createQuoteEntity(input);
	},
};
