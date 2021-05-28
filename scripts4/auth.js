auth.onAuthStateChanged((user) => {
    if (user) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                db.collection('friends').doc(user.uid).update({
                    coordenadas: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });

            });
        }
        db.collection('friends').onSnapshot(snapshot => {
            getFriends(snapshot.docs);
            confMenu(user);
        }, err => {
            console.log(err.message);
        });
        
        var name, email, photoUrl, uid, emailVerified;
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
        console.log(name, email, photoUrl, emailVerified, uid);
    }
    else {
        console.log('Usuario salió');
        getFriends([]);
        confMenu();
    }

});


const salir = document.getElementById('salir');
salir.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        alert("El usuario ha salido del sistema");
        console.log("El usuario salió");
    }).catch(err => {
        console.log(err);
    });
});

function mensajeError(codigo) {
    let mensaje = '';
    switch (codigo) {
        case 'auth/wrong-password':
            mensaje = 'Su contraseña no es correcta';
            break;
        case 'auth/user-not-found':
            mensaje = 'El usuario no existe o el correo no esta registrado';
            break;
        case 'auth/weak-password':
            mensaje = 'Contraseña débil debe tener al menos 6 caracteres';
            break;
        default:
            mensaje = 'Ocurrió un error al ingresar con este usuario ' + codigo;
    }
    return mensaje;
}

var welcome = ''
const formaingresar = document.getElementById('formLogIn');
formaingresar.addEventListener('submit', (e) => {
    e.preventDefault();
    let correo = formaingresar['correo'].value;
    let contrasena = formaingresar['contraseña'].value;

    auth.signInWithEmailAndPassword(correo, contrasena).then(cred => {
        let cerrar = document.getElementById('cerrar1');
        cerrar.click();
        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML = '';
    }).catch(err => {
        formaingresar.querySelector('.error').innerHTML = mensajeError(err.code);
        console.log(err);
    });

});

const formaRegistrarse = document.getElementById('formSignIn');
formaRegistrarse.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Entró")
    const correo = formaRegistrarse['rcorreo'].value;
    const contraseña = formaRegistrarse['rcontraseña'].value;
    auth.createUserWithEmailAndPassword(correo, contraseña).then(cred => {
        //Hasta aqui estaría el usuario creado
        console.log("Se creo el usuario");
        console.log(formaRegistrarse['rnombre'].value);
        console.log(formaRegistrarse['rtelefono'].value);
        console.log(formaRegistrarse['rdireccion'].value);
        return db.collection('friends').doc(cred.user.uid).set({
            nombre: formaRegistrarse['rnombre'].value,
            telefono: formaRegistrarse['rtelefono'].value,
            direccion: formaRegistrarse['rdireccion'].value
        });
    }).then(() => {
        let cerrar2 = document.getElementById('cerrar2');
        cerrar2.click();
        formaRegistrarse.reset();
        formaRegistrarse.querySelector('.error').innerHTML = '';
    }).catch(err => {
        formaRegistrarse.querySelector('.error').innerHTML = mensajeError(err.code);
    })
})

logInGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken;
        console.log(token);
        var user = result.user;

        let html = `
        <p>Nombre: ${user.displayName}</p>
        <p>Correo: ${user.email}</p>
        <div class="d-flex justify-content-center">
            <img style="width: 200px; height: 200px; border-radius: 50%;" src="${user.photoURL}"/>
        </div>
        `;


        misDatos.innerHTML = html;
        let cerrar = document.getElementById('cerrar1');
        cerrar.click();
        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML = '';
    }).catch((err) => {
        console.log(err)
    })
}

logInGithub = () => {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken;
        console.log(token);
        var user = result.user;

        let html = `
        <p>Nombre: ${user.displayName}</p>
        <p>Correo: ${user.email}</p>
        <div class="d-flex justify-content-center">
            <img style="width: 200px; height: 200px; border-radius: 50%;" src="${user.photoURL}"/>
        </div>
        `;
        misDatos.innerHTML = html;
        let cerrar = document.getElementById('cerrar1');
        cerrar.click();
        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML = '';
    }).catch((err) => {
        console.log(err)
    })
}

logInApple = () => {
    var provider = new firebase.auth.OAuthProvider('apple.com');
    firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken;
        console.log(token);
        var user = result.user;

        let html = `
        <p>Nombre: ${user.displayName}</p>
        <p>Correo: ${user.email}</p>
        <div class="d-flex justify-content-center">
            <img style="width: 200px; height: 200px; border-radius: 50%;" src="${user.photoURL}"/>
        </div>
        `;


        misDatos.innerHTML = html;
        let cerrar = document.getElementById('cerrar1');
        cerrar.click();
        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML = '';
    }).catch((err) => {
        console.log(err)
    })
}

logInFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken;
        console.log(token);
        var user = result.user;
        let html = `
        <p>Nombre: ${user.displayName}</p>
        <p>Correo: ${user.email}</p>
        <div class="d-flex justify-content-center">
            <img style="width: 200px; height: 200px; border-radius: 50%;" src="${user.photoURL}"/>
        </div>
        `;
        misDatos.innerHTML = html;
        let cerrar = document.getElementById('cerrar1');
        cerrar.click();
        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML = '';
    }).catch((err) => {
        console.log(err)
    })
}

