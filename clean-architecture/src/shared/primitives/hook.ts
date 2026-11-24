import type { AnyInput } from "./any-input";
import type { Controller } from "./controller";
import type { ViewModel } from "./view-model";

export type Hook<C extends Controller<AnyInput>, VM extends ViewModel | ViewModel[]> = () => {
	controller: C;
	viewModel: VM;
};
