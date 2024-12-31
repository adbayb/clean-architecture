import { UseCaseInteractor, success } from "@clean-architecture/shared-kernel";
import type {
	UseCaseInputData,
	UseCaseOutputData,
} from "@clean-architecture/shared-kernel";

import type { QuoteEntityGatewayPort } from "../../Quote";

export type GetQuoteInputData = UseCaseInputData<{
	id: string;
}>;

export type GetQuoteOutputData = UseCaseOutputData<{
	content: string;
}>;

export class GetQuoteUseCase extends UseCaseInteractor<
	GetQuoteInputData,
	GetQuoteOutputData,
	QuoteEntityGatewayPort
> {
	public override async execute(input: GetQuoteInputData) {
		const entityGatewayResult = await this.entityGateway.getOne(input.id);

		if (entityGatewayResult.type === "failure") {
			this.presenter.error(entityGatewayResult);
		} else {
			this.presenter.ok(
				success({
					content: entityGatewayResult.payload.attributes.content,
				}),
			);
		}
	}
}
