import {Entity, createEntity} from './entity/index.js'

export class Game {
	/** @type {jQuery} */
	#gameField

	/** @type {jQuery} */
	#rows

	/** @type {number} */
	#width

	/** @type {number} */
	#height

	/** @type {Entity[]} */
	entities = []

	#tick = 0

	constructor(gameField) {
		this.#gameField = gameField
		this.entities = new Array(gameField.children('entity')).map(element => createEntity(element, this))

		this.#rows = gameField.find('#landscape').children('.row')
		this.#rows.each((_, row) => row.fields = $(row).children('field'))

		this.#height = this.#rows.length
		this.#width = Math.max(...this.#rows.map((_, row) => $(row).children('field').length))
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

	/** @param {number} x */
	normalizeX(x) {
		return Math.min(Math.max(x, 0), this.width - 1)
	}

	/** @param {number} y */
	normalizeY(y) {
		return Math.min(Math.max(y, 0), this.height - 1)
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {Element}
	 */
	get(x, y) {
		return this.#rows[y]?.fields[x]
	}

	update() {
		this.entities.forEach(entity => entity.update(this))
		this.#tick++
	}
}

export const game = new Game($('#gamefield'))