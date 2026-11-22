import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./main";

const rootElement = document.querySelector("#root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<Main />
		</StrictMode>,
	);
}
