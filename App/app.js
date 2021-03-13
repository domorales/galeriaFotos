const express = require('express'),
	cookieParser = require('cookie-parser'),
	morgan = require('morgan'),
	path = require('path'),
	session = require('express-session'),
	flash = require('connect-flash'),
	dir_views = path.join(__dirname, 'views'),
	dir_public = path.join(__dirname, 'public'),
	routes_authentication = path.join(__dirname, 'routes/authentication'),
	routes_gallery = path.join(__dirname, 'routes/gallery'),
	app = express();

app //
	.set('views', dir_views)
	.set('view engine', 'pug')
	.set('port', process.env.PORT || 3000);

app
	.use(morgan('dev'))
	.use(express.json())
	.use(express.urlencoded({ extended: false }))
	.use(cookieParser())
	.use(
		session({
			secret: 'crudnode123',
			saveUninitialized: false,
			resave: false,
		})
	)
	.use(flash())
	.use((req, res, next) => {
		app.locals.success = req.flash('success');
		app.locals.error = req.flash('error');
		next();
	})
	.use(express.static(dir_public))
	.use(require(routes_authentication))
	.use(require(routes_gallery));

module.exports = app;
