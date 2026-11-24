import {
	Guard,
	createCreatedAtValueObject,
	createEntityFactory,
	createIdValueObject,
	createPriceValueObject,
	success,
} from "../../../../shared";
import type {
	CreatedAtValueObject,
	Entity,
	EntityGatewayBoundary,
	IdValueObject,
	PriceValueObject,
	Result,
} from "../../../../shared";

export type ProductEntity = Entity<{
	id: IdValueObject;
	title: string;
	brand: string;
	category: string;
	createdAt: CreatedAtValueObject;
	price: PriceValueObject;
	thumbnail: string;
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

export type ProductEntityGatewayBoundary = EntityGatewayBoundary<{
	getMany: () => Promise<Result<ProductEntity>[]>;
	getOne: (id: string) => Promise<Result<ProductEntity>>;
	toEntity: (input: ProductEntityFactoryInput) => Result<ProductEntity>;
}>;

export const createProductEntity = createEntityFactory<ProductEntity, ProductEntityFactoryInput>(
	(helpers, { id, title, brand, category, createdAt, price, thumbnail }) => {
		const guardTitleResult = Guard.mustBeLessThanCharacters(title, 280);

		if (guardTitleResult.type === "failure") {
			return guardTitleResult;
		}

		const priceValueObject = createPriceValueObject(price);

		if (priceValueObject.type === "failure") {
			return priceValueObject;
		}

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
	},
);
