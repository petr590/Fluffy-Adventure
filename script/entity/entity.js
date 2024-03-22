import {Controller, EmptyController, PlayerController} from '../controller/index.js';
import {TICK_TIME, Actions, ATTR_DIR, ATTR_TYPE, ATTR_ACTION} from '../config.js';

/**
 * @param {string} type тип entity
 * @param {string} action выполняемое действие (из )
 * @param {string} dir направление entity
 * @returns {string} путь к спрайту (относительно index.html)
 */
export function getSpritePath(type, action) {
	return `assets/${type}/${action}.png`
}


export class Entity {
	static #playerFound = false

	/** @type {jQuery} */
	#element

	#x = 0; #y = 0

	/** @type { { dx: number, dy: number, duration: number, action: string } }*/
	#step = null

	/** @type {Controller} */
	#controller

	constructor(element, game) {
		this.#element = element

		this.x = Number(element.attr('x')) ?? 0
		this.y = Number(element.attr('y')) ?? 0

		if (!Entity.#playerFound && element.attr('id') == 'player') {
			this.#controller = new PlayerController(this, game)
			Entity.#playerFound = true

		} else {
			this.#controller = new EmptyController()
		}

		this.updateSprite()
	}

	get element() {
		return this.#element
	}

	get x() {
		return this.#x
	}

	get y() {
		return this.#y
	}

	set x(x) {
		this.#x = x
		this.#element.css('--x', x)
	}

	set y(y) {
		this.#y = y
		this.#element.css('--y', y)
	}


	updateSprite() {
		const element = this.#element

		let type = element.attr(ATTR_TYPE),
			action = element.attr(ATTR_ACTION) ?? Actions.WALKING
		
		element.css('background-image', type && action ? `url("${getSpritePath(type, action)}")` : '')
	}


	/** @param {Game} game */
	update(game) {
		let step = this.#step

		if (step == null || --step.duration <= 0) {

			if (step != null) {
				this.#element.removeAttr(ATTR_ACTION).css('--step-duration', '0')
				this.updateSprite()
			}

			this.#step = step = this.#controller.getStep()
			// console.log(step);

			if (step != null) {
				this.x = game.normalizeX(this.x + step.dx)
				this.y = game.normalizeY(this.y + step.dy)

				this.#element.attr(ATTR_ACTION, step.action).css('--step-duration', step.duration * TICK_TIME + 'ms')

				let dir = ''

				switch (Math.sign(step.dy)) {
					case +1: dir += 's'; break
					case -1: dir += 'n'; break
				}

				switch (Math.sign(step.dx)) {
					case +1: dir += 'e'; break
					case -1: dir += 'w'; break
				}

				if (dir != '') {
					this.#element.attr(ATTR_DIR, dir)
				}
			}

			this.updateSprite()

			if (step?.duration == 0) {
				this.#step = null
				this.#element.removeAttr(ATTR_ACTION).css('--step-duration', '0')
			}
		}
	}
}