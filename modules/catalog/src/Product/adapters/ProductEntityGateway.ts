import type {
	DataSourceBoundary,
	DataTransferObject,
	EntityGatewayFactory,
} from "@clean-architecture/shared-kernel";

import { createProductEntity } from "../entities/ProductEntity";
import type { ProductEntityGatewayBoundary } from "../entities/ProductEntity";

type ProductDataSourceDTO = DataTransferObject<{
	id: string;
	title: string;
	price: number;
}>;

export type ProductDataSourceBoundary =
	DataSourceBoundary<ProductDataSourceDTO>;

export const createProductEntityGateway: EntityGatewayFactory<
	ProductEntityGatewayBoundary,
	ProductDataSourceBoundary
> = (dataSource) => {
	return {
		async getMany() {
			const dataSourceOutput = await dataSource.readAll();

			if (dataSourceOutput.type === "failure") return [dataSourceOutput];

			return dataSourceOutput.payload.map((item) => toEntity(item));
		},
		async getOne(id) {
			const dataSourceOutput = await dataSource.read(id);

			if (dataSourceOutput.type === "failure") return dataSourceOutput;

			return toEntity(dataSourceOutput.payload);
		},
	};
};

const toEntity = (input: ProductDataSourceDTO) => {
	return createProductEntity({
		id: input.id,
		content: input.title,
		fullName: input.id,
	});
};
