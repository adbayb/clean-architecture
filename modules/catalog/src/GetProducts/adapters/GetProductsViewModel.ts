import type { ViewModel } from "@clean-architecture/shared-kernel";

export type GetProductsViewModel = ViewModel<
	{
		title: string;
		brand: string;
		price: string;
		thumbnail: string;
	},
	string
>[];
