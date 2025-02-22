import type {
	Presenter,
	PresenterFactory,
} from "@clean-architecture/shared-kernel";

import type { GetProductsOutputData } from "../useCases/GetProductsUseCase";
import type { GetProductsViewModel } from "./GetProductsViewModel";

export type GetProductsPresenter = Presenter<GetProductsOutputData>;

export const createGetProductsPresenter: PresenterFactory<
	GetProductsPresenter,
	GetProductsOutputData,
	GetProductsViewModel
> = (onViewModelChange) => {
	return {
		display(input) {
			const viewModel: GetProductsViewModel = input.map((item) => {
				if (item instanceof Error) {
					return { payload: formatError(item), type: "failure" };
				}

				return { payload: formatProduct(item), type: "success" };
			});

			onViewModelChange(viewModel);
		},
	};
};

// eslint-disable-next-line unicorn/prefer-native-coercion-functions
const formatError = (input: Extract<GetProductsOutputData[number], Error>) => {
	return String(input);
};

const formatProduct = ({
	title,
	brand,
	price,
	thumbnail,
}: Exclude<GetProductsOutputData[number], Error>) => {
	return {
		title: title.toLocaleUpperCase(),
		brand,
		price: new Intl.NumberFormat("en-EN", {
			currency: "USD",
			style: "currency",
		}).format(price),
		thumbnail,
	};
};
