import { useEffect, useMemo, useState } from "react";

import { GetQuoteUseCase } from "../../useCases/GetQuoteUseCase";
import type { GetQuoteViewModel } from "../../adapters/GetQuoteViewModel";
import { GetQuotePresenter } from "../../adapters/GetQuotePresenter";
import { GetQuoteController } from "../../adapters/GetQuoteController";
import { useDependencyInjection } from "./useDependencyInjection";

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

const useGetQuote = () => {
	const { quoteEntityGateway } = useDependencyInjection();
	const [viewModel, setViewModel] = useState<GetQuoteViewModel>({});
	const presenter = useMemo(() => new GetQuotePresenter(setViewModel), []);

	const useCase = useMemo(
		() => new GetQuoteUseCase(quoteEntityGateway, presenter),
		[quoteEntityGateway, presenter],
	);

	const controller = useMemo(
		() => new GetQuoteController(useCase),
		[useCase],
	);

	return useMemo(() => {
		return { controller, viewModel };
	}, [controller, viewModel]);
};
