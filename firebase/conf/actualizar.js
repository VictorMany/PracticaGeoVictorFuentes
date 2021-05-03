formularioeditar.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = formularioeditar.ideditar.value;
    let nombre = formularioeditar.nombreeditar.value;
    let mensaje = formularioeditar.mensajeeditar.value;
    var registro = new Registro(id, nombre, mensaje);
    registro.actualizar();
    var idregistro = document.getElementById(id);
    idregistro.querySelector('.nombre').value = nombre + ' ';
    idregistro.querySelector('.mensaje').value = mensaje + ' ';
    formularioeditar.nombreeditar.value = '';
    formularioeditar.mensajeeditar.value = '';
    $('#ventanaeditar').modal('hide');
});