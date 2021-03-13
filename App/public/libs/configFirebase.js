const proveedor_google = new firebase.auth.GoogleAuthProvider(),
	proveedor_fb = new firebase.auth.FacebookAuthProvider();

const access_email = (correo, contrasenia) => {
	firebase
		.auth()
		.signInWithEmailAndPassword(correo, contrasenia)
		.then((user) => {
			return user.user.getIdToken().then((idtoken) => {
				return fetch('/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ idtoken }),
				});
			});
		})
		.then(() => {
			return firebase.auth().signOut();
		})
		.then(() => {
			window.location.assign('/profile');
		})
		.catch((err) => {
			if (err.code == 'auth/wrong-password')
				window.location.assign('/errorlogin');
		});
};

const access_login_app = (proveedor) => {
	firebase
		.auth()
		.signInWithPopup(proveedor)
		.then((user) => {
			return user.user.getIdToken().then((idtoken) => {
				return fetch('/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ idtoken }),
				});
			});
		})
		.then(() => {
			return firebase.auth().signOut();
		})
		.then(() => {
			window.location.assign('/profile');
		})
		.catch((err) => {
			if (err.code == 'auth/wrong-password')
				window.location.assign('/errorlogin');
		});
};

export function initFirebase() {
	const firebaseConfig = {
		//config
	};
	firebase.initializeApp(firebaseConfig);
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
	firebase.analytics();
}

export function accederFB() {
	access_login_app(proveedor_fb);
}

export function accederGoogle() {
	access_login_app(proveedor_google);
}

export function accederMail(correo, contrasenia) {
	access_email(correo, contrasenia);
}
