import {
	createNetworkDataSourceFactory,
	success,
} from "@clean-architecture/shared-kernel";

import type { ProductDataSourceBoundary } from "../adapters/ProductEntityGateway";

type ProductDummyJsonDataSourceDto = {
	id: number;
	title: string;
	description: string;
	brand: string;
	category: string;
	images: string[];
	meta: {
		createdAt: string;
		updatedAt: string;
	};
	price: number;
	stock: number;
	tags: string[];
	thumbnail: string;
};

export const createProductDummyJsonDataSource = createNetworkDataSourceFactory<
	ProductDataSourceBoundary,
	ProductDummyJsonDataSourceDto
>("https://dummyjson.com/products/", (client) => {
	return {
		async create(payload) {
			const result = await client.post("/add", { body: payload });

			if (result.type === "failure") return result;

			return success(this.toDto(result.payload));
		},
		async delete(id) {
			const result = await client.delete(`/${id}`);

			if (result.type === "failure") return success(false);

			return success(true);
		},
		async read(id) {
			const result = await client.get(`/${id}`);

			if (result.type === "failure") return result;

			return success(this.toDto(result.payload));
		},
		async readMany() {
			const result = await client.get<{
				products: ProductDummyJsonDataSourceDto[];
			}>("/");

			if (result.type === "failure") return result;

			return success(
				result.payload.products.map((item) => this.toDto(item)),
			);
		},
		toDto(input: ProductDummyJsonDataSourceDto) {
			return {
				id: String(input.id),
				title: input.title,
				brand: input.brand,
				category: input.category,
				createdAt: input.meta.createdAt,
				price: input.price,
				thumbnail: input.thumbnail,
			};
		},
	};
});
