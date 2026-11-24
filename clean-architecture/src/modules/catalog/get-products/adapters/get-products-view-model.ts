import type { ViewModel } from "../../../../shared";

export type GetProductsViewModel = ViewModel<{
	title: string;
	brand: string;
	price: string;
	thumbnail: string;
}>[];
