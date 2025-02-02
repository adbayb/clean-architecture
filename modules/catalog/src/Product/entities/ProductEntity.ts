import {
	Guard,
	createEntityFactory,
	createIdValueObject,
	success,
} from "@clean-architecture/shared-kernel";
import type {
	Entity,
	EntityGatewayBoundary,
	Result,
} from "@clean-architecture/shared-kernel";

import { createCreatedAtValueObject } from "../../shared/entities/CreatedAtValueObject";
import type { CreatedAtValueObject } from "../../shared/entities/CreatedAtValueObject";
import { createAuthorValueObject } from "../../shared/entities/AuthorValueObject";
import type { AuthorValueObject } from "../../shared/entities/AuthorValueObject";

export type ProductEntity = Entity<{
	author: AuthorValueObject;
	content: string;
	createdAt: CreatedAtValueObject;
}>;

export type ProductEntityGatewayBoundary = EntityGatewayBoundary<{
	getMany: () => Promise<Result<ProductEntity>[]>;
	getOne: (id: string) => Promise<Result<ProductEntity>>;
}>;

export type ProductEntityFactoryInput = Pick<ProductEntity, "content"> & {
	id?: string;
	fullName: string;
};

export const createProductEntity = createEntityFactory<
	ProductEntity,
	ProductEntityFactoryInput
>((helpers, { id, content, fullName }) => {
	const guardContentResult = Guard.mustBeLessThanCharacters(content, 280);

	if (guardContentResult.type === "failure") return guardContentResult;

	const authorValueObject = createAuthorValueObject({ fullName });

	if (authorValueObject.type === "failure") return authorValueObject;

	const entity: ProductEntity = {
		id: createIdValueObject(id),
		author: authorValueObject.payload,
		content,
		createdAt: createCreatedAtValueObject(undefined),
		isEqualTo(input) {
			return helpers.isEqualTo(entity, input);
		},
	};

	return success(entity);
});
