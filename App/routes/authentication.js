const express = require('express'),
	router = express.Router(),
	admin = require('../database/firebase');

router.get('/', (req, res) => {
	res.render('login');
});

router.get('/errorlogin', (req, res) => {
	req.flash('error', 'Correo o contraseña incorrecta');
	res.redirect('/');
});

router.get('/register', (req, res) => {
	res.clearCookie('session');
	res.render('register');
});

router.post('/register', (req, res) => {
	admin
		.auth()
		.createUser({
			email: req.body.user,
			emailVerified: false,
			password: req.body.pass,
			displayName: req.body.name + ' ' + req.body.last_name,
			disabled: false,
		})
		.then(() => res.redirect('/'))
		.catch((err) => {
			req.flash('error', 'El Correo ya esta vinculado con una cuenta');
			res.redirect('/register');
		});
});

router.post('/login', (req, res) => {
	const idtoken = req.body.idtoken,
		expiresIn = 60 * 60 * 24 * 5 * 1000;
	admin
		.auth()
		.createSessionCookie(idtoken, { expiresIn })
		.then((sessionCookie) => {
			const options = { maxAge: expiresIn, httpOnly: true, secure: true };
			res.cookie('session', sessionCookie, options);
			res.end(
				JSON.stringify({ status: 'success' }, (error) => {
					res.status(401).send('UNAUTHORIZED REQUEST!');
				})
			);
		})
		.catch((err) => {
			console.log(err);
			req.flash('error', 'Correo o contraseña incorrecta');
			res.redirect('/');
		});
});

module.exports = router;
