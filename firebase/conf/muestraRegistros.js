function muestraRegistros(doc) {
    var registro = new Registro(doc.id, doc.data().nombre, doc.data().mensaje);

    let li = document.createElement("li");
    li.setAttribute("id", registro.id);

    let nombre = document.createElement("input");
    nombre.type = "text";
    nombre.value = registro.nombre;
    nombre.className = "nombre form-control";
    nombre.style.backgroundColor = '#273C62A8';
    nombre.style.color = 'white';
    nombre.style.marginBottom = '1rem';


    let mensaje = document.createElement("textarea");
    mensaje.value = registro.mensaje;
    mensaje.className = "mensaje form-control";
    mensaje.style.backgroundColor = '#071633A6';
    mensaje.style.color = 'white';


    let borrar = document.createElement("button");
    borrar.className = "btn  m-2";
    borrar.textContent = "Borrar  ";
    borrar.style.backgroundColor = '#2559B9';
    borrar.style.color = 'white';


    let editar = document.createElement("button");
    editar.className = "btn m-3";
    editar.textContent = "Editar  ";
    editar.setAttribute("data-toggle", "modal");
    editar.setAttribute("data-target", "#ventanaeditar");
    editar.style.backgroundColor = '#1B2581';
    editar.style.color = 'white';

    li.appendChild(borrar);
    li.appendChild(editar);
    li.appendChild(nombre);
    li.appendChild(mensaje);

    mensajeslista.appendChild(li);

    borrar.addEventListener("click", (e) => {
        let id = e.target.parentElement.getAttribute("id");
        registro.borrar(id);
    });

    editar.addEventListener("click", (e) => {
        let id = e.target.parentElement.getAttribute("id");
        registro.editar(id);
    });

}