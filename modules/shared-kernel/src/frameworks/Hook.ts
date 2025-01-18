import type { ViewModel } from "../adapters/ViewModel";
import type { Controller } from "../adapters/Controller";
import type { AnyInput } from "../AnyInput";

export type Hook<C extends Controller<AnyInput>, VM extends ViewModel> = () => {
	controller: C;
	viewModel: VM;
};
