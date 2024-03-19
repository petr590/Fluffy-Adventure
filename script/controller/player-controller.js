import {Controller} from './controller.js';
import {Actions, ATTR_TYPE} from '../config.js';

const	UP      = 'ArrowUp',
		DOWN    = 'ArrowDown',
		LEFT    = 'ArrowLeft',
		RIGHT   = 'ArrowRight',
		SITTING = 'Shift'

// В тиках
const	WALK_STEP_DURATION = 6,
		RUN_STEP_DURATION  = 4,
		SWIM_STEP_DURATION = 8

/**
 * @param {number} dx
 * @param {number} dy
 * @param {number} duration
 * @returns {number}
 */
function normalizeDuration(dx, dy, duration) {
	return dx == 0 || dy == 0 ?
			duration :
			Math.round(duration * Math.SQRT2)
}


const	SITTING_STEP           = Object.freeze({ dx: 0, dy: 0, duration: 0, action: Actions.SITTING }),
		SWIMMING_IN_PLACE_STEP = Object.freeze({ dx: 0, dy: 0, duration: 0, action: Actions.SWIMMING })


export class PlayerController extends Controller {
	/** @type {Entity} */
	#entity

	/** @type {Game} */
	#game

	#dx = 0
	#dy = 0

	/** @type {Set<string>} */
	#pressedKeys = new Set()

	/** @type {boolean} */
	#sitting

	constructor(entity, game) {
		super()

		this.#entity = entity
		this.#game = game
		this.#sitting = entity.element.attr(Actions.SITTING) == 'true'

		const pressedKeys = this.#pressedKeys

		$(document.body).on('keydown', event => {
			pressedKeys.add(event.key)

			switch (event.key) {
				case UP:      this.#dy = -1; this.#sitting = false; break
				case DOWN:    this.#dy = +1; this.#sitting = false; break
				case LEFT:    this.#dx = -1; this.#sitting = false; break
				case RIGHT:   this.#dx = +1; this.#sitting = false; break

				case SITTING:
					this.#sitting = !this.#sitting &&
							this.#dx == 0 && this.#dy == 0 &&
							!this.isWater(entity.x, entity.y)
					break
					
				default: return
			}

			event.preventDefault()

		}).on('keyup', event => {
			pressedKeys.delete(event.key)

			switch (event.key) {
				case UP:    this.#dy = pressedKeys.has(DOWN)  ? +1 : 0; break
				case DOWN:  this.#dy = pressedKeys.has(UP)    ? -1 : 0; break
				case LEFT:  this.#dx = pressedKeys.has(RIGHT) ? +1 : 0; break
				case RIGHT: this.#dx = pressedKeys.has(LEFT)  ? -1 : 0; break
				default: return
			}

			event.preventDefault()
		})
	}


	isWater(x, y) {
		const game = this.#game
		const field = game.get(game.normalizeX(x), game.normalizeX(y))
		return field != null && field.getAttribute(ATTR_TYPE) == 'water'
	}


	getStep() {
		const entity = this.#entity

		const	dx = this.#dx,
				dy = this.#dy
		
		let isWater = this.isWater(entity.x + dx, entity.y + dy)

		if (dx == 0 && dy == 0) {
			return  isWater ? SWIMMING_IN_PLACE_STEP :
					this.#sitting ? SITTING_STEP : null
		}

		if (isWater) {
			return {
				dx, dy,
				duration: normalizeDuration(dx, dy, SWIM_STEP_DURATION),

				// Не применять анимацию плавания при заходе в воду
				action: this.isWater(entity.x, entity.y) ? Actions.SWIMMING : Actions.WALKING
			}
		}
		
		let running = this.#pressedKeys.has('Control') || this.#pressedKeys.has('Meta')

		return {
			dx, dy,
			duration: normalizeDuration(dx, dy, running ? RUN_STEP_DURATION : WALK_STEP_DURATION),
			action: running ? Actions.RUNNING : Actions.WALKING
		}
	}
}
