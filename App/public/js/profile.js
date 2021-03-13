import { eliminarLoader, subirImagen, quitarLoader } from '../libs/upload.js';

document.addEventListener('change', async (e) => {
	e.preventDefault();
	await subirImagen(e);
});

document.addEventListener('submit', (e) => {
	quitarLoader(e);
});

document.addEventListener('DOMContentLoaded', () => {
	eliminarLoader();
});
