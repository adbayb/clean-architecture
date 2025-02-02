import type { ViewModel } from "@clean-architecture/shared-kernel";

export type GetProductViewModel = ViewModel<{
	data?: string;
	error?: Error;
}>;
