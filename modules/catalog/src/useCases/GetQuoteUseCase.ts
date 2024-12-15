import {
	IdValueObject,
	UseCaseInteractor,
	success,
} from "@clean-architecture/shared-kernel";
import type {
	RequestModel,
	ResponseModel,
} from "@clean-architecture/shared-kernel";

import type { QuoteEntityGatewayPort } from "../entities/QuoteEntityGatewayPort";

export type GetQuoteRequestModel = RequestModel<{
	id: string;
}>;

export type GetQuoteResponseModel = ResponseModel<{
	content: string;
}>;

export class GetQuoteUseCase extends UseCaseInteractor<
	GetQuoteRequestModel,
	GetQuoteResponseModel,
	QuoteEntityGatewayPort
> {
	public override async execute(requestModel: GetQuoteRequestModel) {
		const id = IdValueObject.create(requestModel.id);
		const entityGatewayResult = await this.entityGateway.getOne(id);

		if (entityGatewayResult.type === "failure") {
			this.presenter.error(entityGatewayResult);
		} else {
			this.presenter.ok(
				success({ content: entityGatewayResult.payload.content }),
			);
		}
	}
}
