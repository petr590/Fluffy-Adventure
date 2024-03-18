import {Entity, createEntity} from './entity/index.js'

export class Game {
	/** @type {jQuery} */
	#gameField

	/** @type {number} */
	#width

	/** @type {number} */
	#height

	/** @type {Entity[]} */
	entities = []

	#tick = 0

	constructor(gameField) {
		this.#gameField = gameField
		this.entities = new Array(gameField.children('entity')).map(createEntity)

		let rows = gameField.children('.row')

		this.#height = rows.length
		this.#width = Math.max(...rows.map((_, row) => $(row).children('field').length))
	}

	get gameField() {
		return this.#gameField
	}

	get width() {
		return this.#width
	}

	get height() {
		return this.#height
	}

	get tick() {
		return this.#tick
	}

	update() {
		this.entities.forEach(entity => entity.update(this))
		this.#tick++
	}
}

export const game = new Game($('#gamefield'))