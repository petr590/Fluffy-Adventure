import {Entity, getSpritePath} from './entity.js'
import {Cat} from './cat.js'
import {ATTR_TYPE} from '../config.js'

export {Entity, Cat, getSpritePath}

export const entityByType = {
	cat: Cat,
}

/** @param {jQuery} element */
export function createEntity(element, game) {
	return new (entityByType[element.attr(ATTR_TYPE)] ?? Entity)(element, game)
}