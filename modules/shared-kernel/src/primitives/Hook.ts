import type { ViewModel } from "./ViewModel";
import type { Controller } from "./Controller";
import type { AnyInput } from "./AnyInput";

export type Hook<
	C extends Controller<AnyInput>,
	VM extends ViewModel | ViewModel[],
> = () => {
	controller: C;
	viewModel: VM;
};
