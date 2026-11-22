import type { Presenter, PresenterFactory } from "@clean-architecture/shared";
import type { GetProductsOutputData } from "../use-cases/get-products-use-case";
import type { GetProductsViewModel } from "./get-products-view-model";

export type GetProductsPresenter = Presenter<GetProductsOutputData>;

export const createGetProductsPresenter: PresenterFactory<
	GetProductsPresenter,
	GetProductsOutputData,
	GetProductsViewModel
> = (onViewModelChange) => {
	return {
		display(input) {
			const viewModel: GetProductsViewModel = input.map(({ payload, type }) => {
				if (type === "failure") {
					return {
						payload: String(payload),
						type: "failure",
					};
				}

				return { payload: formatProduct(payload), type: "success" };
			});

			onViewModelChange(viewModel);
		},
	};
};

type GetProductOutputData = GetProductsOutputData[number];

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
