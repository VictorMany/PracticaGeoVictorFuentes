
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
        $('#logInModal').modal('hide');
        formaingresar.reset();
        console.log("El usuario se logueó correctamente ");

        var user = firebase.auth().currentUser;
        welcome = "Bienvenido " + user.email;
        formaingresar.querySelector('.error').innerHTML = '';
    }).then(cred => {
        alert(welcome);
    }).catch(err => {
        formaingresar.querySelector('.error').innerHTML = mensajeError(err.code);
        console.log(err);
    });

});
