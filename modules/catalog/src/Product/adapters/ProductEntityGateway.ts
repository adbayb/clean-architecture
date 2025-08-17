import type {
	DataSourceBoundary,
	EntityGatewayFactory,
} from "@clean-architecture/shared";

import { createProductEntity } from "../entities/ProductEntity";
import type {
	ProductEntityFactoryInput,
	ProductEntityGatewayBoundary,
} from "../entities/ProductEntity";

export type ProductDataSourceBoundaryDto = ProductEntityFactoryInput;
export type ProductDataSourceBoundary =
	DataSourceBoundary<ProductDataSourceBoundaryDto>;

export const createProductEntityGateway: EntityGatewayFactory<
	ProductEntityGatewayBoundary,
	ProductDataSourceBoundary
> = (dataSource) => {
	return {
		async getMany() {
			const dataSourceOutput = await dataSource.readMany();

			if (dataSourceOutput.type === "failure") return [dataSourceOutput];

			return dataSourceOutput.payload.map((item) => this.toEntity(item));
		},
		async getOne(id) {
			const dataSourceOutput = await dataSource.read(id);

			if (dataSourceOutput.type === "failure") return dataSourceOutput;

			return this.toEntity(dataSourceOutput.payload);
		},
		toEntity(input) {
			return createProductEntity(input);
		},
	};
};
