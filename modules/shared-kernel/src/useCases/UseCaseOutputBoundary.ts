import type { UseCaseOutputData } from "./UseCaseOutputData";

export type UseCaseOutputBoundary<OutputData extends UseCaseOutputData> = {
	/**
	 * Error presentation handler.
	 * @param input - The use case output data.
	 */
	error: (input: OutputData) => void;
	/**
	 * Success presentation handler.
	 * @param input - The use case output data.
	 */
	ok: (input: OutputData) => void;
	/*
	 * // Other contract can be added to present common errors (naming is inspired by the related http error)
	 * notFound(): void;
	 * forbidden(): void;
	 */
};
