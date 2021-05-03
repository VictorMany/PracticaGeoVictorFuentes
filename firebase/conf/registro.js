class Registro {

    constructor(id, nombre, mensaje) {
        this.id = id;
        this.nombre = nombre;
        this.mensaje = mensaje;
    };

    borrar(id) {
        db.collection("mensajes").doc(id).delete();
    };

    agregar() {
        db.collection('mensajes').add({
            nombre: this.nombre,
            mensaje: this.mensaje
        });
    }

    editar(id) {
        formularioeditar.nombreeditar.value = this.nombre;
        formularioeditar.mensajeeditar.value = this.mensaje;
        formularioeditar.ideditar.value = this.id;
    };

    actualizar() {
        db.collection('mensajes').doc(this.id).update({
            nombre: this.nombre,
            mensaje: this.mensaje
        });
    };

};