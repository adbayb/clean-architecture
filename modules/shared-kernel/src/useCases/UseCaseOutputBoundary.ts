import type { UseCaseOutputData } from "./UseCaseOutputData";

export type UseCaseOutputBoundary<OutputData extends UseCaseOutputData> = {
	/**
	 * Presentation handler.
	 * @param input - The use case output data.
	 */
	display: (input: OutputData) => void;
};
