import type { ViewModel } from "@clean-architecture/shared";

export type GetProductsViewModel = ViewModel<
	{
		title: string;
		brand: string;
		price: string;
		thumbnail: string;
	},
	string
>[];
