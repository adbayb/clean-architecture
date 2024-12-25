import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { Main } from "./Main";

const rootElement = document.querySelector("#root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<Main />
		</StrictMode>,
	);
}
