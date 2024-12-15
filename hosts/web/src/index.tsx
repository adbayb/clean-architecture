import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { App } from "./App";

const rootElement = document.querySelector("#root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
