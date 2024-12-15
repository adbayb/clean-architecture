import { Entity, Guard, success } from "@clean-architecture/shared-kernel";
import type { IdValueObject } from "@clean-architecture/shared-kernel";

import { CreatedAtValueObject } from "./CreatedAtValueObject";
import type { AuthorValueObject } from "./AuthorValueObject";

export class QuoteEntity extends Entity {
	public createdAt: CreatedAtValueObject;

	private constructor(
		public override id: IdValueObject,
		public author: AuthorValueObject,
		public content: string,
	) {
		super(id);
		this.createdAt = CreatedAtValueObject.create();
	}

	public static override create(
		id: IdValueObject,
		author: AuthorValueObject,
		content: string,
	) {
		const guardResult = Guard.mustBeLessThanCharacters(content, 280);

		if (guardResult.type === "failure") return guardResult;

		return success(new QuoteEntity(id, author, content));
	}
}
