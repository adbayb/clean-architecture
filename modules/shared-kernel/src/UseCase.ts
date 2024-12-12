export abstract class UseCaseInteractor<RequestModel, ResponseModel>
	implements UseCaseInputPort<RequestModel>
{
	public constructor(
		protected readonly presenter: UseCaseOutputPort<ResponseModel>,
	) {
		this.presenter = presenter;
	}

	public abstract execute(requestModel: RequestModel): Promise<void> | void;
}

export type UseCaseInputPort<RequestModel> = {
	execute: (requestModel: RequestModel) => Promise<void> | void;
};

export type UseCaseOutputPort<ResponseModel> = {
	empty: () => void;
	/**
	 * Generic error presentation handler.
	 * @param message - The contextual error message.
	 */
	fail: (message: string) => void;
	ok: (responseModel: ResponseModel) => void;
	/*
	 * // Other contract can be added to present common errors (e.g. related to http code)
	 * notFound(): void;
	 * forbidden(): void;
	 */
};
