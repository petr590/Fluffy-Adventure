import {game} from './game.js'
import {getSpritePath, entityByType} from './entity/index.js';
import {TICK_TIME, TEXTURE_SIZE, RANDOM_TEXTURES, DIRECTRIONS, ACTIONS, ATTR_TYPE} from './config.js';

// Рандомное смещение текстур
for (let texture in RANDOM_TEXTURES) {
	let config = RANDOM_TEXTURES[texture]

	let fields = $(`field[${ATTR_TYPE}=${texture}]`)

	fields.each((_, field) => {
		field = $(field)

		if (config.offset) {
			field.css('--off-x', Math.round(Math.random() * TEXTURE_SIZE) / TEXTURE_SIZE)
				 .css('--off-y', Math.round(Math.random() * TEXTURE_SIZE) / TEXTURE_SIZE)
		}

		if (config.rotate90) {
			field.css('--rotation', Math.round(Math.random() * 4))

		} else if (config.rotate180) {
			field.css('--rotation', Math.round(Math.random() * 2) * 2)
		}
	})
}


// Предзагрузка спрайтов для избежания задержек
for (let type in entityByType) {
	for (let action of ACTIONS) {
		for (let dir of DIRECTRIONS) {
			let img = document.createElement('img')
			img.src = getSpritePath(type, action, dir)
			// console.log(img.src)
		}
	}
}

// Главный цикл
setInterval(() => game.update(), TICK_TIME)