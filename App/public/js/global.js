import { initThemeDark, comprobarThemeDark } from '../libs/dark.js';

$(document).ready(function () {
	$('#mostrarmodal').modal('show');
});

document.addEventListener('click', (e) => {
	if (e.target.matches('.card-img-top')) {
		document.querySelector('.img_modal').src = e.target.src;
		$('#mostrarmodal_img').modal('show');
	}
});

document.addEventListener('DOMContentLoaded', () => {
	comprobarThemeDark();
});

initThemeDark();
