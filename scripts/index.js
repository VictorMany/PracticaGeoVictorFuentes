const listanonlogged = document.querySelectorAll('.non-logged');
const listalogged = document.querySelectorAll('.logged');
const misDatos = document.querySelector('.datosdelacuenta');

//Cada que se loguea un usuario o salio
const confMenu = (user) => {
    if (user) {
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



const dishesList = document.getElementById('dishesList');

const getDishes = (data) => {
    if (data.length) {
        let html = '';

        data.forEach(doc => {
            const platillo = doc.data();


            const column = `
            <div class="col-12 col-md-4">
                <img src="${platillo.image}"
                    alt="platillo1">
                <div class="row m-2 d-flex justify-content-between">
                    <p>
                    ${platillo.name}</p>
                    <p class="text-danger">$${platillo.price}</p>
                </div>

                <a href="https://www.paypal.me/grupohernandezalba/${platillo.price}" target="_blank">
                    <button class="btn btn-primary">Pagar ahora</button>
                </a>
            </div>
            `;

            html += column;

        });

        dishesList.innerHTML = html;
    }
    else {
        dishesList.innerHTML = '<div style="text-align: center; width: 100%; padding-top: 2rem"><p> Por favor inicie sesión en nuestra aplicación para ver el menú</p></div>'
    }
}