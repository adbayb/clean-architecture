import type { UseCaseOutputData } from "./UseCaseOutputData";

export type UseCaseOutputBoundary<OutputData extends UseCaseOutputData> = {
	/**
	 * Error presentation handler.
	 * @param input - The use case output data.
	 */
	error: (input: GetUseCaseOutputFailureData<OutputData>) => void;
	/**
	 * Success presentation handler.
	 * @param input - The use case output data.
	 */
	ok: (
		input: Exclude<OutputData, GetUseCaseOutputFailureData<OutputData>>,
	) => void;
	/*
	 * // Other contract can be added to present common errors (naming is inspired by the related http error)
	 * notFound(): void;
	 * forbidden(): void;
	 */
};

type GetUseCaseOutputFailureData<OutputData extends UseCaseOutputData> =
	OutputData extends UseCaseOutputData<infer _, infer ErrorInput>
		? ErrorInput
		: never;
