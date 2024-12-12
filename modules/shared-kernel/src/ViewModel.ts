export class ViewModel<Value> {
	#value: Value;

	readonly #setValue: (value: Value) => void;

	public constructor(initialValue: Value, setValue: (value: Value) => void) {
		this.#value = initialValue;
		this.#setValue = setValue;
	}

	public get value() {
		return this.#value;
	}

	public set value(input) {
		this.#value = input;
		this.#setValue(input);
	}
}
