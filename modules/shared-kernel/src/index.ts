import { failure, success } from "@open-vanilla/result";

import type { ViewModel } from "./ViewModel";
import { UseCaseInteractor } from "./UseCase";
import type { ResponseModel } from "./ResponseModel";
import type { RequestModel } from "./RequestModel";
import { Presenter } from "./Presenter";
import { Identifier } from "./Identifier";
import type { EntityGateway } from "./EntityGateway";
import { Entity } from "./Entity";
import { Controller } from "./Controller";

export { Entity } from "./Entity";
export type { EntityGateway } from "./EntityGateway";
export { ValueObject } from "./ValueObject";
export type { Result } from "./Result";
export { failure, success } from "./Result";
export { UseCaseInteractor } from "./UseCase";
export { Controller } from "./Controller";
export { Presenter } from "./Presenter";
export type { RequestModel } from "./RequestModel";
export type { ResponseModel } from "./ResponseModel";
export type { ViewModel } from "./ViewModel";

type GetQuoteRequestModel = RequestModel<{
	id: string;
}>;

type GetQuoteResponseModel = ResponseModel<{
	content: string;
}>;

type GetQuoteViewModel = ViewModel<{
	data?: string;
	error?: Error;
}>;

class Quote extends Entity {
	public createdAt: string; // TODO: Date Value Object

	public constructor(
		public override id: Identifier,
		public content: string,
	) {
		super(id);
		this.createdAt = new Date().toISOString();
	}
}

class QuoteGateway implements EntityGateway<Quote> {
	public async getMany() {
		await Promise.resolve();

		return [];
	}

	public async getOne(id: Identifier) {
		await Promise.resolve();

		return new Quote(id, "Fake content");
	}
}

class GetQuoteUseCase extends UseCaseInteractor<
	GetQuoteRequestModel,
	GetQuoteResponseModel
> {
	public override async execute(requestModel: GetQuoteRequestModel) {
		const entity = await this.entityGateway.getOne(
			Identifier.create("test"),
		);

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

class GetQuotePresenter extends Presenter<
	GetQuoteResponseModel,
	GetQuoteViewModel
> {
	public override toViewModel(
		responseModel: GetQuoteResponseModel,
	): GetQuoteViewModel {
		if (responseModel.type === "failure") {
			return {
				error: responseModel.payload,
			};
		}

		return {
			data: responseModel.payload.content,
		};
	}
}

class GetQuoteController extends Controller<GetQuoteRequestModel> {}

// Drafted control flow following [Clean architecture diagram (from the book)](https://i.sstatic.net/K44FQ.jpg):
const presenter = new GetQuotePresenter({}, console.log);
const gateway = new QuoteGateway();
const useCase = new GetQuoteUseCase(gateway, presenter);
const controller = new GetQuoteController(useCase);

void controller.execute({ id: "test" });
