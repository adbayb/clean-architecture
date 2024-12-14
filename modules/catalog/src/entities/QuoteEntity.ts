import { Entity, Guard, success } from "@clean-architecture/shared-kernel";
import type { IdValueObject } from "@clean-architecture/shared-kernel";

import { CreatedAtValueObject } from "./CreatedAtValueObject";

export class QuoteEntity extends Entity {
	public createdAt: CreatedAtValueObject;

	private constructor(
		public override id: IdValueObject,
		public content: string,
	) {
		super(id);
		this.createdAt = CreatedAtValueObject.create();
	}

	public static override create(id: IdValueObject, content: string) {
		const lessThanGuard = Guard.mustBeLessThanCharacters(content, 280);

		if (lessThanGuard.type === "failure") return lessThanGuard;

		return success(new QuoteEntity(id, content));
	}
}
