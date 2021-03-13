const $check = document.getElementById('check_theme'),
	ls = localStorage,
	$objects = document.querySelectorAll(`[data-dark]`);

const darkmode = () => {
	$objects.forEach((el) => {
		el.classList.add('dark');
		document.body.classList.add('body_dark');
	});
	ls.setItem('theme', 'true');
	$check.checked = true;
};

const ligthmode = () => {
	$objects.forEach((el) => {
		el.classList.remove('dark');
		document.body.classList.remove('body_dark');
	});
	$check.checked = false;
	ls.setItem('theme', 'false');
};

export function initThemeDark() {
	$check.addEventListener('click', (e) => {
		if ($check.checked == true) {
			darkmode();
		} else {
			ligthmode();
		}
	});
}

export function comprobarThemeDark() {
	if (ls.getItem('theme') === null) {
		ls.setItem('theme', 'false');
	}
	if (ls.getItem('theme') === 'false') {
		ligthmode();
	} else {
		darkmode();
	}
}
