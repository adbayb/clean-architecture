export abstract class UseCaseInteractor<RequestModel, ResponseModel>
	implements UseCaseInputPort<RequestModel>
{
	public constructor(
		protected readonly presenter: UseCaseOutputPort<ResponseModel>,
	) {}

	public abstract execute(requestModel: RequestModel): Promise<void> | void;
}

export type UseCaseInputPort<RequestModel> = {
	execute: (requestModel: RequestModel) => Promise<void> | void;
};

export type UseCaseOutputPort<ResponseModel> = {
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
