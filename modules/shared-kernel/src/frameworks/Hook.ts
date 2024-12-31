import type { ViewModel } from "../adapters/ViewModel";
import type { Controller } from "../adapters/Controller";

export type Hook<C extends Controller, VM extends ViewModel> = () => {
	controller: C;
	viewModel: VM;
};
