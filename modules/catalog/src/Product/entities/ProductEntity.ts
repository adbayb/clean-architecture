import {
	Guard,
	createCreatedAtValueObject,
	createEntityFactory,
	createIdValueObject,
	createPriceValueObject,
	success,
} from "@clean-architecture/shared";
import type {
	CreatedAtValueObject,
	Entity,
	EntityGatewayBoundary,
	IdValueObject,
	PriceValueObject,
	Result,
} from "@clean-architecture/shared";

import type { ProductDataSourceBoundaryDto } from "../adapters/ProductEntityGateway";

export type ProductEntity = Entity<{
	id: IdValueObject;
	title: string;
	brand: string;
	category: string;
	createdAt: CreatedAtValueObject;
	price: PriceValueObject;
	thumbnail: string;
}>;

export type ProductEntityGatewayBoundary = EntityGatewayBoundary<{
	getMany: () => Promise<Result<ProductEntity>[]>;
	getOne: (id: string) => Promise<Result<ProductEntity>>;
	toEntity: (input: ProductDataSourceBoundaryDto) => Result<ProductEntity>;
}>;

export type ProductEntityFactoryInput = {
	id: string;
	title: string;
	brand: string;
	category: string;
	createdAt: string;
	price: number;
	thumbnail: string;
};

export const createProductEntity = createEntityFactory<
	ProductEntity,
	ProductEntityFactoryInput
>((helpers, { id, title, brand, category, createdAt, price, thumbnail }) => {
	const guardTitleResult = Guard.mustBeLessThanCharacters(title, 280);

	if (guardTitleResult.type === "failure") return guardTitleResult;

	const priceValueObject = createPriceValueObject(price);

	if (priceValueObject.type === "failure") return priceValueObject;

	const entity: ProductEntity = {
		id: createIdValueObject(id),
		title: guardTitleResult.payload,
		brand,
		category,
		createdAt: createCreatedAtValueObject(createdAt),
		isEqualTo(input) {
			return helpers.isEqualTo(entity, input);
		},
		price: priceValueObject.payload,
		thumbnail,
	};

	return success(entity);
});
