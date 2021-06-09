auth.onAuthStateChanged(user => {
    console.log(user);

    if (user) {
        let html = ''

        if (user.photoURL) {
            html = `
            <p>Nombre: ${user.displayName}</p>
            <p>Correo: ${user.email}</p>
            <div class="d-flex justify-content-center">
                <img style="width: 200px; height: 200px; border-radius: 50%;" src="${user.photoURL}"/>
            </div>
        `;

        }
        else {
            html = `
            <p>Nombre: ${user.displayName}</p>
            <p>Correo: ${user.email}</p>
        `;
        }





        misDatos.innerHTML = htmlc;

        iniciaMapa();
        db.collection('ciudades/' + user.uid + '/ciudades').onSnapshot(snapshot => {
            console.log(snapshot.docs);
            let ciudad
            snapshot.docs.forEach(doc => {
                ciudad = doc.data();
                console.log(ciudad)
            });
            getCities(snapshot.docs);
            document.getElementById("weatherBody").style.display = "block"
            document.getElementById("welcome").style.display = "none"
        });
        confMenu(user);
    }
    else {
        confMenu();
        getCities([]);
        document.getElementById("weatherBody").style.display = "none"
        document.getElementById("welcome").style.display = "block"
    }
});

const salir = document.getElementById('salir');

salir.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        alert("El usuario ha salido del sistema");
        console.log("El usuario salió");

        const misDatos = document.querySelector('.datosdelacuenta');
        misDatos.innerHTML = "";
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
        return db.collection('usuarios').doc(cred.user.uid).set({
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
