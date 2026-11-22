import type { UseCaseOutputData } from "./use-case-output-data";

export type UseCaseOutputBoundary<OutputData extends UseCaseOutputData | UseCaseOutputData[]> = {
	/**
	 * Presentation handler.
	 *
	 * @param input - The use case output data.
	 */
	display: (input: OutputData) => void;
};
