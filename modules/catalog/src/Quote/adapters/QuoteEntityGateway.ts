import { failure } from "@clean-architecture/shared-kernel";
import type {
	DataSourceBoundary,
	DataTransferObject,
	EntityGatewayFactory,
} from "@clean-architecture/shared-kernel";

import { createQuoteEntity } from "../entities/QuoteEntity";
import type { QuoteEntityGatewayBoundary } from "../entities/QuoteEntity";

type QuoteDataSourceDTO = DataTransferObject<{
	id: string;
	title: string;
	price: number;
}>;

export type QuoteDataSourceBoundary = DataSourceBoundary<QuoteDataSourceDTO>;

export const createQuoteEntityGateway: EntityGatewayFactory<
	QuoteEntityGatewayBoundary,
	QuoteDataSourceBoundary
> = (dataSource) => {
	return {
		async getMany() {
			const dataSourceOutput = await dataSource.readAll();

			if (dataSourceOutput.type === "failure")
				return [
					failure(
						new Error(
							"An error occurred while retrieving the entity from the data source",
						),
					),
				];

			return dataSourceOutput.payload.map((item) => toEntity(item));
		},
		async getOne(id) {
			const dataSourceOutput = await dataSource.read(id);

			if (dataSourceOutput.type === "failure")
				return failure(
					new Error(
						"An error occurred while retrieving the entity from the data source",
					),
				);

			return toEntity(dataSourceOutput.payload);
		},
	};
};

const toEntity = (input: QuoteDataSourceDTO) => {
	return createQuoteEntity({
		id: input.id,
		content: input.title,
		fullName: input.id,
	});
};
