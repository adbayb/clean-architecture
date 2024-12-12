import type { Result } from "@open-vanilla/result";

import type { DataTransferObject } from "./DataTransferObject";

export abstract class UseCaseInteractor<
	RequestModel extends DataTransferObject,
	ResponseModel extends Result<unknown>,
> implements UseCaseInputPort<RequestModel>
{
	public constructor(
		protected readonly presenter: UseCaseOutputPort<ResponseModel>,
	) {}

	public abstract execute(requestModel: RequestModel): Promise<void> | void;
}

export type UseCaseInputPort<RequestModel> = {
	execute: (requestModel: RequestModel) => Promise<void> | void;
};

export type UseCaseOutputPort<ResponseModel extends Result<unknown>> = {
	/**
	 * Error presentation handler.
	 * @param responseModel - The contextual error response model.
	 */
	error: (responseModel: ResponseModel) => void;
	/**
	 * Success presentation handler.
	 * @param responseModel - The contextual success response model.
	 */
	ok: (responseModel: ResponseModel) => void;
	/*
	 * // Other contract can be added to present common errors (naming is inspired by the related http error)
	 * notFound(): void;
	 * forbidden(): void;
	 */
};
