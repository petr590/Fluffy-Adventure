// Не используется
export class Direction {
	static NORTH      = new Direction('n',   0, -1)
	static NORTH_EAST = new Direction('ne', +1, -1)
	static       EAST = new Direction('e',  +1,  0)
	static SOUTH_EAST = new Direction('se', +1, +1)
	static SOUTH      = new Direction('s',   0, +1)
	static SOUTH_WEST = new Direction('sw', -1, +1)
	static       WEST = new Direction('w',  -1,  0)
	static NORTH_WEST = new Direction('nw', -1, -1)

	static DIRS = [Direction.NORTH, Direction.NORTH_EAST, Direction.EAST, Direction.SOUTH_EAST, Direction.SOUTH, Direction.SOUTH_WEST, Direction.WEST, Direction.NORTH_WEST]

	#name; #dx; #dy

	constructor(name, dx, dy) {
		this.#name = name
		this.#dx = dx
		this.#dy = dy
	}

	get name() {
		return this.#name
	}

	get dx() {
		return this.#dx
	}

	get dy() {
		return this.#dy
	}

	toString() {
		return this.#name
	}

	opposite() {
		switch (this.#name) {
			case 'n':  return Direction.SOUTH
			case 'ne': return Direction.SOUTH_WEST
			case 'e':  return Direction.WEST
			case 'se': return Direction.NORTH_WEST
			case 's':  return Direction.NORTH
			case 'sw': return Direction.NORTH_EAST
			case 'w':  return Direction.EAST
			case 'nw': return Direction.SOUTH_EAST
		}
	}
}