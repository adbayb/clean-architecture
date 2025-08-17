import { useEffect, useMemo, useState } from "react";
import type { ReactElement } from "react";
import { Box, Card, Heading, Text } from "@clean-architecture/shared";
import type { Hook } from "@clean-architecture/shared";

import { createGetProductsInteractor } from "../useCases/GetProductsUseCase";
import type { GetProductsViewModel } from "../adapters/GetProductsViewModel";
import { createGetProductsPresenter } from "../adapters/GetProductsPresenter";
import { createGetProductsController } from "../adapters/GetProductsController";
import type { GetProductsController } from "../adapters/GetProductsController";
import { useProductEntityGateway } from "../../Product";

type GetProductsViewProps = {
	readonly actionSlot: ReactElement;
};

export const GetProductsView = ({ actionSlot }: GetProductsViewProps) => {
	const { controller, viewModel } = useGetProducts();

	useEffect(() => {
		void controller.execute({});
	}, [controller]);

	return (
		<Box
			alignItems="center"
			display="flex"
			flexDirection="column"
			gap="16"
			justifyContent="center"
			paddingBlock="12"
			paddingInline="24"
		>
			<Heading size="5xl">Catalog</Heading>
			<Box
				alignItems="center"
				display="flex"
				flexWrap="wrap"
				gap="4"
				justifyContent="center"
			>
				{viewModel.map(({ payload, type }) => {
					if (type === "failure") {
						return <Text key={payload}>{payload}</Text>;
					}

					const { title, price, thumbnail } = payload;

					return (
						<Card
							actionSlot={actionSlot}
							header={{ title, description: price }}
							image={{
								accessibilityLabel: title,
								source: thumbnail,
							}}
							key={title}
						/>
					);
				})}
			</Box>
		</Box>
	);
};

const useGetProducts: Hook<
	GetProductsController,
	GetProductsViewModel
> = () => {
	const { entityGateway } = useProductEntityGateway();
	const [viewModel, setViewModel] = useState<GetProductsViewModel>([]);

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
