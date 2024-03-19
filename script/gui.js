if (localStorage.getItem('controls-shown') === null) {
	localStorage.setItem('controls-shown', true)

	$('#controls-modal').prop('checked', true)

	let handler = () => {
		$('#controls-modal').prop('checked', false)
		$(document.body).off('keydown', handler) // Одноразовое нажатие

		return false // Отменяем событие
	}

	$(document.body).on('keydown', handler)
}