import {
	Guard,
	createEntityFactory,
	createIdValueObject,
	success,
} from "@clean-architecture/shared-kernel";
import type { Entity } from "@clean-architecture/shared-kernel";

import { createCreatedAtValueObject } from "../../shared/entities/CreatedAtValueObject";
import type { CreatedAtValueObject } from "../../shared/entities/CreatedAtValueObject";
import { createAuthorValueObject } from "../../shared/entities/AuthorValueObject";
import type { AuthorValueObject } from "../../shared/entities/AuthorValueObject";

export type QuoteEntity = Entity<{
	author: AuthorValueObject;
	content: string;
	createdAt: CreatedAtValueObject;
}>;

export type QuoteEntityFactoryInput = Pick<QuoteEntity, "content"> & {
	id?: string;
	fullName: string;
};

export const createQuoteEntity = createEntityFactory<
	QuoteEntity,
	QuoteEntityFactoryInput
>((helpers, { id, content, fullName }) => {
	const guardContentResult = Guard.mustBeLessThanCharacters(content, 280);

	if (guardContentResult.type === "failure") return guardContentResult;

	const authorValueObject = createAuthorValueObject({ fullName });

	if (authorValueObject.type === "failure") return authorValueObject;

	const entity: QuoteEntity = {
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
