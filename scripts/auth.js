
auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
        db.collection('dishes').onSnapshot(snapshot => {
            getDishes(snapshot.docs);
        });
        confMenu(user);
    }
    else {
        confMenu();
        getDishes([]);
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
            mensaje = 'Ocurrió un error al ingresar con este usuario';
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
        return db.collection('usuarios').doc(cred.user.uid).set({
            nombre: formaRegistrarse['rnombre'].value,
            telefono: formaRegistrarse['rtelefono'].value,
            direccion: formaRegistrarse['rdireccion'].value
        })
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
        <div style="padding: 2rem; width: 500px; height: 500px;">
            <img style="width: 100% height: 100%; border-radius: 50%;" src="${user.photoURL}"/>
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