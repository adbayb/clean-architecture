import { useEffect } from "react";
import { useGetQuote } from "@clean-architecture/catalog";

export const GetQuote = () => {
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
