import {Controller, EmptyController, PlayerController} from '../controller/index.js';
import {TICK_TIME, Actions} from '../config.js';

/**
 * @param {string} type тип entity
 * @param {string} action выполняемое действие (из )
 * @param {string} dir направление entity
 * @returns {string} путь к спрайту (относительно index.html)
 */
export function getSpritePath(type, action, dir) {
	return `assets/${type}/${action}/${dir}.png`
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

	constructor(element) {
		this.#element = element

		if (!Entity.#playerFound && element.attr('id') == 'player') {
			this.#controller = new PlayerController()
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

		let dir = element.attr('dir'),
			type = element.attr('type'),
			action = element.attr('action') ?? Actions.WALKING
		
		element.css('background-image', type && action && dir ? `url("${getSpritePath(type, action, dir)}")` : '')
	}


	/** @param {Game} game */
	update(game) {
		let step = this.#step

		if (step == null || --step.duration <= 0) {

			if (step != null) {
				this.#element.removeAttr('action').css('--step-duration', '0')
				this.updateSprite()
			}

			this.#step = step = this.#controller.getStep()

			if (step != null) {
				this.x = Math.min(Math.max(this.x + step.dx, 0), game.width - 1)
				this.y = Math.min(Math.max(this.y + step.dy, 0), game.height - 1)

				this.#element.attr('action', step.action).css('--step-duration', step.duration * TICK_TIME + 'ms')

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
					this.#element.attr('dir', dir)
				}

				this.updateSprite()
			}
		}
	}
}