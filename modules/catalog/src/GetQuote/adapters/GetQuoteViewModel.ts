import type { ViewModel } from "@clean-architecture/shared-kernel";

export type GetQuoteViewModel = ViewModel<{
	data?: string;
	error?: Error;
}>;
