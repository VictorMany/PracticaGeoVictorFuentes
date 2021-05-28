const listanonlogged = document.querySelectorAll('.non-logged');
const listalogged = document.querySelectorAll('.logged');
const misDatos = document.querySelector('.datosdelacuenta');

//Cada que se loguea un usuario o salio
const confMenu = (user) => {
    if (user) {
        db.collection('friends').doc(user.uid).get().then(doc => {
            const html = `
            <p>Nombre: ${doc.data().nombre}</p>
            <p>Correo: ${user.email}</p>
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
        console.log(doc.data().coordenadas)

        pos = {
            lat: doc.data().coordenadas.lat,
            lng: doc.data().coordenadas.lng
        };

        let propiedadesMarcador = {
            position: pos,
            map,
            title: doc.data().nombre
        }
        const marcador = new google.maps.Marker(propiedadesMarcador);

        
        const infowindow = new google.maps.InfoWindow({
            content: doc.data().nombre
        })

        marcador.addListener("click", () => {
            infowindow.open(map, marcador);
        })

        marcador.addListener("mouseover", () => {
            infowindow.open(map, marcador);
        })
    });
};