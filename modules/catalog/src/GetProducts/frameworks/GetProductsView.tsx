import { useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, Text } from "@clean-architecture/shared-kernel";
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
		return <Text>{viewModel.error}</Text>;
	}

	if (viewModel.data) {
		return (
			<Grid
				gap="6"
				templateColumns="repeat(3, 1fr)"
			>
				{viewModel.data.map(({ title, price, thumbnail }) => (
					<Box
						as="section"
						key={title}
					>
						<Text>{title}</Text>
						<Button>Plop</Button>
						{JSON.stringify({ title, price, thumbnail })}
					</Box>
				))}
			</Grid>
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
