import {
	Entity,
	Guard,
	IdValueObject,
	success,
} from "@clean-architecture/shared-kernel";
import type { GetValueFromValueObject } from "@clean-architecture/shared-kernel";

import { CreatedAtValueObject } from "../../shared/entities/CreatedAtValueObject";
import { AuthorValueObject } from "../../shared/entities/AuthorValueObject";

type QuoteEntityAttributes = {
	id: IdValueObject;
	author: AuthorValueObject;
	content: string;
	createdAt: CreatedAtValueObject;
};

type QuoteEntityCreateInput = GetValueFromValueObject<AuthorValueObject> &
	Pick<QuoteEntityAttributes, "content"> & {
		id: string;
	};

export class QuoteEntity extends Entity<QuoteEntityAttributes> {
	private constructor(public override attributes: QuoteEntityAttributes) {
		super(attributes);
	}

	public static override create({
		id,
		content,
		firstName,
		lastName,
	}: QuoteEntityCreateInput) {
		const guardContentResult = Guard.mustBeLessThanCharacters(content, 280);

		if (guardContentResult.type === "failure") return guardContentResult;

		const author = AuthorValueObject.create({ firstName, lastName });

		if (author.type === "failure") return author;

		return success(
			new QuoteEntity({
				id: IdValueObject.create(id),
				author: author.payload,
				content,
				createdAt: CreatedAtValueObject.create(),
			}),
		);
	}
}
