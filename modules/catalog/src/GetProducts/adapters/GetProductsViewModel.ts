import type { ViewModel } from "@clean-architecture/shared-kernel";

export type GetProductsViewModel = ViewModel<{
	data?: {
		title: string;
		brand: string;
		price: string;
		thumbnail: string;
	}[];
	error?: string[];
}>;
