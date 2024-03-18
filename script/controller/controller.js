export class Controller {
	/** @returns {{ dx: number, dy: number, duration: number, action: string } | null}
	 * объект, содержащий смещение и длительность шага, а также действие.
	 * Если шаг делать не нужно, то возвращает null. */
	getStep() {
		throw new Error('Must be overriden in subclasses')
	}
}