import { success } from "@clean-architecture/shared-kernel";
import type {
	UseCaseInputData,
	UseCaseInteractor,
	UseCaseInteractorFactory,
	UseCaseOutputData,
} from "@clean-architecture/shared-kernel";

import type { QuoteEntityGatewayBoundary } from "../../Quote";

export type GetQuoteInputData = UseCaseInputData<{
	id: string;
}>;

export type GetQuoteOutputData = UseCaseOutputData<{
	content: string;
}>;

export type GetQuoteInteractor = UseCaseInteractor<GetQuoteInputData>;

export const createGetQuoteInteractor: UseCaseInteractorFactory<
	GetQuoteInteractor,
	GetQuoteInputData,
	GetQuoteOutputData,
	QuoteEntityGatewayBoundary
> = (entityGateway, presenter) => {
	return {
		async execute(input) {
			const entityGatewayResult = await entityGateway.getOne(input.id);

			if (entityGatewayResult.type === "failure") {
				presenter.error(entityGatewayResult);
			} else {
				presenter.ok(
					success({
						content: entityGatewayResult.payload.content,
					}),
				);
			}
		},
	};
};
