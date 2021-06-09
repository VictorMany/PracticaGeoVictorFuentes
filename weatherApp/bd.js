const listanonlogged = document.querySelectorAll('.non-logged');
const listalogged = document.querySelectorAll('.logged');
const misDatos = document.querySelector('.datosdelacuenta');
var actualUser = '';

//Cada que se loguea un usuario o salio
const confMenu = (user) => {
    if (user) {
        actualUser = user;
        db.collection('usuarios').doc(user.uid).get().then(doc => {
            console.log(doc);
            const html = `
            <p>Nombre: ${doc.data().nombre}</p>
            <p>Correo: ${user.email}</p>
            <p>Teleono>: ${doc.data().telefono}</p>
            <p>Direccion: ${doc.data().direccion}</p>
            `;
            misDatos.innerHTML = html;
        });
        listalogged.forEach(item => {
            item.style.display = 'block';
        });
        listanonlogged.forEach(item => {
            item.style.display = 'none';
        });
    } else {
        listalogged.forEach(item => item.style.display = 'none')
        listanonlogged.forEach(item => item.style.display = 'block')
    }

}



const citiesList = document.getElementById('ciudades');

const getCities = (data) => {
    citiesList.innerHTML = ""
    if (data.length) {
        data.forEach(doc => {
            const city = doc.data();
            const option = document.createElement('option');
            const valor = city.nombre;
            option.value = valor;
            option.text = valor;
            citiesList.appendChild(option)
        });
    }
}


function addCities() {
    console.log("id del usuario", actualUser.uid)
    db.collection('ciudades')
        .doc(actualUser.uid)
        .collection('ciudades')
        .add({ nombre: document.getElementById("ciudad").innerHTML })
}


citiesList.addEventListener('change', (event) => {
    let textContent = event.target.value;
    iniciaMapa(textContent);
    console.log(textContent)
});

