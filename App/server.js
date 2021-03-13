const app = require('./app'),
	port = app.get('port');

app.listen(port, (err) => {
	if (err) console.log('Error al conectarse al servidor');
	else console.log(`Servidor conectado en el puerto: ${port}`);
});
