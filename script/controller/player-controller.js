import {Controller} from './controller.js';
import {Actions} from '../config.js';

const	UP      = 'ArrowUp',
		DOWN    = 'ArrowDown',
		LEFT    = 'ArrowLeft',
		RIGHT   = 'ArrowRight',
		SITTING = 'Shift'

// В тиках
const	WALK_STEP_DURATION = 6,
		RUN_STEP_DURATION = 4

export class PlayerController extends Controller {
	#dx = 0
	#dy = 0

	#pressedKeys = new Set()

	#sitting = false

	constructor() {
		super()

		const pressedKeys = this.#pressedKeys

		$(document.body).on('keydown', event => {
			pressedKeys.add(event.key)

			switch (event.key) {
				case UP:      this.#dy = -1; break
				case DOWN:    this.#dy = +1; break
				case LEFT:    this.#dx = -1; break
				case RIGHT:   this.#dx = +1; break
				case SITTING: this.#sitting = !this.#sitting; return
				default: return
			}

			this.#sitting = false

		}).on('keyup', event => {
			pressedKeys.delete(event.key)

			switch (event.key) {
				case UP:    this.#dy = pressedKeys.has(DOWN)  ? +1 : 0; break
				case DOWN:  this.#dy = pressedKeys.has(UP)    ? -1 : 0; break
				case LEFT:  this.#dx = pressedKeys.has(RIGHT) ? +1 : 0; break
				case RIGHT: this.#dx = pressedKeys.has(LEFT)  ? -1 : 0; break
			}
		})
	}

	getStep() {
		let dx = this.#dx,
			dy = this.#dy

		if (dx == 0 && dy == 0) {
			if (this.#sitting)
				return { dx: 0, dy: 0, duration: 0, action: Actions.SITTING }

			return null
		}
		
		let running = this.#pressedKeys.has('Control') || this.#pressedKeys.has('Cmd') // Надо бы проверить на Mac

		let duration = Math.round((running ? RUN_STEP_DURATION : WALK_STEP_DURATION) * (dx != 0 && dy != 0 ? Math.SQRT2 : 1))

		return {
			dx, dy, duration,
			action: running ? Actions.RUNNING : Actions.WALKING
		}
	}
}
