import type { DataSourceBoundary, EntityGatewayFactory } from "@clean-architecture/shared";
import { createProductEntity } from "../entities/product-entity";
import type {
	ProductEntityFactoryInput,
	ProductEntityGatewayBoundary,
} from "../entities/product-entity";

export type ProductDataSourceBoundary = DataSourceBoundary<ProductDataSourceBoundaryDto>;
export type ProductDataSourceBoundaryDto = ProductEntityFactoryInput;

export const createProductEntityGateway: EntityGatewayFactory<
	ProductEntityGatewayBoundary,
	ProductDataSourceBoundary
> = (dataSource) => {
	return {
		async getMany() {
			const dataSourceOutput = await dataSource.readMany();

			if (dataSourceOutput.type === "failure") {
				return [dataSourceOutput];
			}

			return dataSourceOutput.payload.map((item) => {
				return this.toEntity(item);
			});
		},
		async getOne(id) {
			const dataSourceOutput = await dataSource.read(id);

			if (dataSourceOutput.type === "failure") {
				return dataSourceOutput;
			}

			return this.toEntity(dataSourceOutput.payload);
		},
		toEntity(input) {
			return createProductEntity(input);
		},
	};
};
