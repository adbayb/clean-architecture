import { useEffect, useMemo, useState } from "react";
import type { Hook } from "@clean-architecture/shared-kernel";

import { createGetProductsInteractor } from "../useCases/GetProductsUseCase";
import type { GetProductsViewModel } from "../adapters/GetProductsViewModel";
import { createGetProductsPresenter } from "../adapters/GetProductsPresenter";
import { createGetProductsController } from "../adapters/GetProductsController";
import type { GetProductsController } from "../adapters/GetProductsController";
import { useDependencyInjection } from "../../shared/frameworks/DependencyInjection";

export const GetProductsView = () => {
	const { controller, viewModel } = useGetProducts();

	useEffect(() => {
		void controller.execute({ id: "1" });
	}, [controller]);

	if (viewModel.error) {
		return <p style={{ color: "red" }}>{String(viewModel.error)}</p>;
	}

	if (viewModel.data) {
		return (
			<section>
				{viewModel.data.map((item) => (
					<p key={item.title}>{JSON.stringify(item)}</p>
				))}
			</section>
		);
	}

	return null;
};

const useGetProducts: Hook<
	GetProductsController,
	GetProductsViewModel
> = () => {
	const { entityGateway } = useDependencyInjection();
	const [viewModel, setViewModel] = useState<GetProductsViewModel>({});

	const presenter = useMemo(
		() => createGetProductsPresenter(setViewModel),
		[],
	);

	const useCaseInteractor = useMemo(
		() => createGetProductsInteractor(entityGateway, presenter),
		[entityGateway, presenter],
	);

	const controller = useMemo(
		() => createGetProductsController(useCaseInteractor),
		[useCaseInteractor],
	);

	return useMemo(() => {
		return { controller, viewModel };
	}, [controller, viewModel]);
};
