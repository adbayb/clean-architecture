import { useEffect, useMemo, useState } from "react";
import type { Hook } from "@clean-architecture/shared-kernel";

import { createGetQuoteInteractor } from "../useCases/GetQuoteUseCase";
import type { GetQuoteViewModel } from "../adapters/GetQuoteViewModel";
import { createGetQuotePresenter } from "../adapters/GetQuotePresenter";
import { createGetQuoteController } from "../adapters/GetQuoteController";
import type { GetQuoteController } from "../adapters/GetQuoteController";
import { useDependencyInjection } from "../../shared/frameworks/DependencyInjection";

export const GetQuoteView = () => {
	const { controller, viewModel } = useGetQuote();

	useEffect(() => {
		void controller.execute({ id: "todo" });
	}, [controller]);

	if (viewModel.error) {
		return <p>Error: {String(viewModel.error)}</p>;
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

const useGetQuote: Hook<GetQuoteController, GetQuoteViewModel> = () => {
	const { entityGateway } = useDependencyInjection();
	const [viewModel, setViewModel] = useState<GetQuoteViewModel>({});
	const presenter = useMemo(() => createGetQuotePresenter(setViewModel), []);

	const useCaseInteractor = useMemo(
		() => createGetQuoteInteractor(entityGateway, presenter),
		[entityGateway, presenter],
	);

	const controller = useMemo(
		() => createGetQuoteController(useCaseInteractor),
		[useCaseInteractor],
	);

	return useMemo(() => {
		return { controller, viewModel };
	}, [controller, viewModel]);
};
