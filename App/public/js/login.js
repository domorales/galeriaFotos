import {
	initFirebase,
	accederMail,
	accederFB,
	accederGoogle,
} from '../libs/configFirebase.js';

const d = document,
	$form_login = d.getElementById('form_login'),
	$form_login_google = d.getElementById('form_login_google'),
	$form_login_fb = d.getElementById('form_login_fb');

d.addEventListener('DOMContentLoaded', (e) => {
	initFirebase();
});

d.addEventListener('submit', (e) => {
	e.preventDefault();
	if (e.target === $form_login)
		accederMail($form_login.user.value, $form_login.pass.value);
	else if (e.target === $form_login_google) accederGoogle();
	else if (e.target === $form_login_fb) accederFB();
});
