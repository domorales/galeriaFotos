const admin = require('firebase-admin'),
	serviceAccount = require('../creden.json'),
	bucket = require('../bucket.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: bucket.bucket,
});

module.exports = admin;
