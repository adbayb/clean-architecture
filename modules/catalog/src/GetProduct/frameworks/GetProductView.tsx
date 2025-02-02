import { useEffect, useMemo, useState } from "react";
import type { Hook } from "@clean-architecture/shared-kernel";

import { createGetProductInteractor } from "../useCases/GetProductUseCase";
import type { GetProductViewModel } from "../adapters/GetProductViewModel";
import { createGetProductPresenter } from "../adapters/GetProductPresenter";
import { createGetProductController } from "../adapters/GetProductController";
import type { GetProductController } from "../adapters/GetProductController";
import { useDependencyInjection } from "../../shared/frameworks/DependencyInjection";

export const GetProductView = () => {
	const { controller, viewModel } = useGetProduct();

	useEffect(() => {
		void controller.execute({ id: "1" });
	}, [controller]);

	if (viewModel.error) {
		return <p style={{ color: "red" }}>{String(viewModel.error)}</p>;
	}

	if (viewModel.data) {
		return (
			<section>
				<h3>{viewModel.data}</h3>
			</section>
		);
	}

	return null;
};

const useGetProduct: Hook<GetProductController, GetProductViewModel> = () => {
	const { entityGateway } = useDependencyInjection();
	const [viewModel, setViewModel] = useState<GetProductViewModel>({});

	const presenter = useMemo(
		() => createGetProductPresenter(setViewModel),
		[],
	);

	const useCaseInteractor = useMemo(
		() => createGetProductInteractor(entityGateway, presenter),
		[entityGateway, presenter],
	);

	const controller = useMemo(
		() => createGetProductController(useCaseInteractor),
		[useCaseInteractor],
	);

	return useMemo(() => {
		return { controller, viewModel };
	}, [controller, viewModel]);
};
