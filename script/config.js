export const TPS = 20
export const TICK_TIME = Math.floor(1000 / TPS)

export const TEXTURE_SIZE = 24

const defaultTextureConfig = Object.freeze({ offset: true, rotate90: true })

export const RANDOM_TEXTURES = {
	grass: defaultTextureConfig,
	moss:  defaultTextureConfig,
	sand:  defaultTextureConfig,
	beachsand: { rotate180: true },
	water:     { rotate180: true },
}

export const DIRECTRIONS = [ 'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw' ]

export const Actions = {
	WALKING: 'walking',
	RUNNING: 'running',
	SITTING: 'sitting',
}

export const ACTIONS = Object.values(Actions)