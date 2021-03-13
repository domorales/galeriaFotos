const express = require('express'),
	router = express.Router(),
	admin = require('../database/firebase'),
	storage = admin.storage().bucket(),
	multer = require('multer'),
	upload = multer({
		storage: multer.memoryStorage(),
	});

router.get('/profile', async (req, res) => {
	const sessionCookie = req.cookies.session || '';
	const urls = [];
	try {
		const decodedClaims = await admin
			.auth()
			.verifySessionCookie(sessionCookie, true /** checkRevoked */);
		if (decodedClaims) {
			const files = await storage.getFiles({
				prefix: `users/${decodedClaims.uid}/`,
			});
			for (let index = 0; index < files[0].length; index++) {
				const url = await files[0][index].getSignedUrl({
					action: 'read',
					expires: '03-17-2025',
				});
				urls.push({
					url: url[0],
					date: files[0][index].metadata.updated.slice(0, 10),
					name: files[0][index].name.split('/')[2],
				});
			}
			res.render('profile', { urls });
		}
	} catch (error) {
		res.redirect('/');
	}
});

router.post('/upload', upload.single('file'), (req, res) => {
	const sessionCookie = req.cookies.session || '';
	admin
		.auth()
		.verifySessionCookie(sessionCookie, true /** checkRevoked */)
		.then((decodedClaims) => {
			const blob = storage.file(
				`users/${decodedClaims.uid}/` + req.file.originalname
			);
			const blobWriter = blob.createWriteStream({
				metadata: {
					contentType: req.file.mimetype,
				},
			});
			blobWriter.on('error', (err) => {
				console.log(err);
			});

			blobWriter.on('finish', () => {
				res.status(200).send('File uploaded.');
			});

			blobWriter.end(req.file.buffer);
		})
		.catch((error) => {
			res.redirect('/');
		});
});

router.post('/delete/:name', async (req, res) => {
	const sessionCookie = req.cookies.session || '';
	const decodedClaims = await admin
		.auth()
		.verifySessionCookie(sessionCookie, true /** checkRevoked */);
	if (decodedClaims) {
		const result = await storage
			.file(`users/${decodedClaims.uid}/${req.params.name}`)
			.delete();
		res.redirect('/profile');
	}
});

router.post('/salir', (req, res) => {
	res.clearCookie('session');
	res.redirect('/');
});

module.exports = router;
