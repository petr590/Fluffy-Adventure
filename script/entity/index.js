import {Entity, getSpritePath} from './entity.js'
import {Cat} from './cat.js'

export {Entity, Cat, getSpritePath}

export const entityByType = {
	cat: Cat,
}

/** @param {jQuery} element */
export function createEntity(element) {
	return new (entityByType[element.attr('type')] ?? Entity)(element)
}