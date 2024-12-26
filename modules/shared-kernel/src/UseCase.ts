import type { Result } from "@open-vanilla/result";

import type { AnyRecord } from "./types";
import type { EntityGateway } from "./EntityGateway";
import type { DataTransferObject } from "./DataTransferObject";

export type UseCaseInputData<Input extends AnyRecord = AnyRecord> =
	DataTransferObject<Input>;

export type UseCaseOutputData<
	SuccessInput = unknown,
	FailureInput extends Error = Error,
> = Result<SuccessInput, FailureInput>;

export abstract class UseCaseInteractor<
	InputData extends UseCaseInputData,
	OutputData extends UseCaseOutputData,
	Gateway extends EntityGateway,
> implements UseCaseInputBoundary<InputData>
{
	public constructor(
		protected readonly entityGateway: Gateway,
		protected readonly presenter: UseCaseOutputBoundary<OutputData>,
	) {}

	public abstract execute(input: InputData): Promise<void> | void;
}

export type UseCaseInputBoundary<InputData extends UseCaseInputData> = {
	execute: (input: InputData) => Promise<void> | void;
};

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
