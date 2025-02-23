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
			const viewModel: GetProductsViewModel = input.map(
				({ payload, type }) => {
					if (type === "failure") {
						return {
							payload: formatError(payload),
							type: "failure",
						};
					}

					return { payload: formatProduct(payload), type: "success" };
				},
			);

			onViewModelChange(viewModel);
		},
	};
};

type GetProductOutputData = GetProductsOutputData[number];

const formatError = (
	input: Extract<GetProductOutputData, { type: "failure" }>["payload"],
	// eslint-disable-next-line unicorn/prefer-native-coercion-functions
) => {
	return String(input);
};

const formatProduct = ({
	title,
	brand,
	price,
	thumbnail,
}: Extract<GetProductOutputData, { type: "success" }>["payload"]) => {
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
