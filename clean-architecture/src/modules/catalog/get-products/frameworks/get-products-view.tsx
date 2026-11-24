import { useEffect, useMemo, useState } from "react";
import type { ReactElement } from "react";
import { Box, Card, Heading, Text } from "../../../../shared";
import type { Hook } from "../../../../shared";
import { useProductEntityGateway } from "../../product";
import { createGetProductsController } from "../adapters/get-products-controller";
import type { GetProductsController } from "../adapters/get-products-controller";
import { createGetProductsPresenter } from "../adapters/get-products-presenter";
import type { GetProductsViewModel } from "../adapters/get-products-view-model";
import { createGetProductsInteractor } from "../use-cases/get-products-use-case";

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
							key={title}
							actionSlot={actionSlot}
							header={{ title, description: price }}
							image={{
								accessibilityLabel: title,
								source: thumbnail,
							}}
						/>
					);
				})}
			</Box>
		</Box>
	);
};

const useGetProducts: Hook<GetProductsController, GetProductsViewModel> = () => {
	const { entityGateway } = useProductEntityGateway();
	const [viewModel, setViewModel] = useState<GetProductsViewModel>([]);

	const presenter = useMemo(() => {
		return createGetProductsPresenter(setViewModel);
	}, []);

	const useCaseInteractor = useMemo(() => {
		return createGetProductsInteractor(entityGateway, presenter);
	}, [entityGateway, presenter]);

	const controller = useMemo(() => {
		return createGetProductsController(useCaseInteractor);
	}, [useCaseInteractor]);

	return useMemo(() => {
		return { controller, viewModel };
	}, [controller, viewModel]);
};
