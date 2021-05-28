const listanonlogged = document.querySelectorAll('.non-logged');
const listalogged = document.querySelectorAll('.logged');
const misDatos = document.querySelector('.datosdelacuenta');

//Cada que se loguea un usuario o salio
const confMenu = (user) => {
    if (user) {
        db.collection('friends').doc(user.uid).get().then(doc => {
            console.log(doc);
            var nombre
            if (doc.data().nombre != undefined)
                nombre = doc.data().nombre
            else
                nombre = user.displayName


            const html = `
            <p>Nombre: ${doc.data().nombre}</p>
            <p>Correo: ${nombre}</p>
            <p>Teleono>: ${doc.data().telefono}</p>
            <p>Direccion: ${doc.data().direccion}</p>
            <p>Coordenadas: ${doc.data().coordenadas.lat}, ${doc.data().coordenadas.lng} </p>
           
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

const getFriends = (data) => {
    var propiedades = {
        center: {
            lat: 21.152639,
            lng: -101.711598
        },
        zoom: 14
    }



    var mapa = document.getElementById("map")
    var map = new google.maps.Map(mapa, propiedades);

    data.forEach(doc => {
        informacion = new google.maps.InfoWindow;

        console.log(doc.data().coordenadas)
        var pos = {
            lat: doc.data().coordenadas.lat,
            lng: doc.data().coordenadas.lng
        };

        informacion.setContent(doc.data().nombre);
        
        let propiedadesMarcador = {
            position: pos,
            map,
            title: doc.data().nombre
        }
        const marcador = new google.maps.Marker(propiedadesMarcador);

        marcador.addListener("click", () => {
            informacion.open(map, marcador);
        })

        marcador.addListener("mouseover", () => {
            informacion.open(map, marcador);
        })
    });
};