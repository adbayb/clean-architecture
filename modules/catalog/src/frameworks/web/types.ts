import type { Controller, ViewModel } from "@clean-architecture/shared-kernel";

export type Hook<C extends Controller, VM extends ViewModel> = () => {
	controller: C;
	viewModel: VM;
};
