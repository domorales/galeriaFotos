const $file = document.getElementById('file'),
	$loader = document.querySelector('.loader');

export function eliminarLoader() {
	$loader.classList.add('none');
}

export async function subirImagen(e) {
	if (e.target === $file) {
		$loader.classList.remove('none');
		for (let i = 0; i < $file.files.length; i++) {
			let file = $file.files[i],
				formData = new FormData();
			formData.append('file', file);
			const options = {
				method: 'POST',
				body: formData,
			};
			await fetch('/upload', options);
		}

		$loader.classList.add('none');
		window.location.assign('/profile');
	}
}

export function quitarLoader(e) {
	if (e.target.matches('#delete_img')) $loader.classList.remove('none');
}
