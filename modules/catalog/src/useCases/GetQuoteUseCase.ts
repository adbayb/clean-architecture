import {
	IdValueObject,
	UseCaseInteractor,
	failure,
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
		const entity = await this.entityGateway.getOne(id);

		this.presenter.ok(
			success({
				content: `Hello world ${JSON.stringify(requestModel)} ${JSON.stringify(entity, null, 2)}`,
			}),
		);

		this.presenter.error(
			failure(
				new Error(
					`An error occurred ${JSON.stringify(requestModel)} ${JSON.stringify(entity, null, 2)}`,
				),
			),
		);
	}
}
