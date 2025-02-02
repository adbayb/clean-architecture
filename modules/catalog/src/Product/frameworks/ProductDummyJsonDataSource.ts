import {
	createNetworkDataSourceFactory,
	success,
} from "@clean-architecture/shared-kernel";

import type { ProductDataSourceBoundary } from "../adapters/ProductEntityGateway";

export const createProductDummyJsonDataSource =
	createNetworkDataSourceFactory<ProductDataSourceBoundary>(
		"https://dummyjson.com/products/",
		(client) => {
			return {
				async create(payload) {
					return client.post("/add", { body: payload });
				},
				async delete(id) {
					await client.delete(`/${id}`);

					return success(true);
				},
				async read(id) {
					return client.get(`/${id}`);
				},
				async readAll() {
					return client.get("/");
				},
			};
		},
	);
