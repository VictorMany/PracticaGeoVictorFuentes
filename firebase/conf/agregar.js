formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    var registro = new Registro(null, formulario.nombre.value, formulario.mensaje.value);
    registro.agregar();
    formulario.nombre.value = '';
    formulario.mensaje.value = '';
    $('#ventananuevo').modal('hide');
});