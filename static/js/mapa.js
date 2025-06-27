document.addEventListener("DOMContentLoaded", function() {

    console.log("DOM content loaded. Initializing maps...");

    // --- Inicialización del mapa para datos.html (id="map-index") ---
    function initDatosMap() {
        var mapElement = document.getElementById('map-index');
        if (mapElement) {
            console.log("Initializing map for datos.html (ID: map-index)");
            var map_datos = L.map('map-index').setView([4.6580, -74.0920], 14); // Centrado en Parque Simón Bolívar

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map_datos);

            // Define el polígono del Parque Metropolitano Simón Bolívar con las coordenadas proporcionadas
            var simonBolivarPolygon = L.polygon([
                L.latLng(4.665204279522433, -74.09330147214612), // Noroeste
                L.latLng(4.659449407992445, -74.08915142600898), // Noreste
                L.latLng(4.652435594545452, -74.0929045111957),  // Sureste aproximado
                L.latLng(4.657255350735185, -74.10026633216941)  // Suroeste
            ], {
                color: 'green',
                fillColor: '#006400', // Verde oscuro
                fillOpacity: 0.2
            }).addTo(map_datos); // <-- Polygon explicitly added ONLY to map_datos

            console.log("Polygon added to map-index.");

            // Datos de los animales con coordenadas creíbles dentro del parque
            var animalsData = [
                { name: "Mirla Grande", lat: 4.6630, lng: -74.0920, info: "Común en zonas arboladas y jardines. Se alimenta de frutas e insectos." },
                { name: "Zambullidor Piquipinto", lat: 4.661649120697874, lng: -74.09385018184106, info: "Ave acuática. Se encuentra en el lago y humedales del parque." },
                { name: "Pibí Oriental", lat: 4.6600, lng: -74.0910, info: "Ave insectívora. Habita en bosques y arboledas." },
                { name: "Reinita Amarilla", lat: 4.6610, lng: -74.0910, info: "Pequeña ave de colores. Común en arbustos y zonas ribereñas." },
                { name: "Pinchaflor Negro", lat: 4.6560, lng: -74.0970, info: "Se alimenta de néctar. Observado en zonas boscosas." },
                { name: "Piranga Roja", lat: 4.6550, lng: -74.0930, info: "Ave migratoria. Prefiere bosques y parques con árboles grandes." },
                { name: "Gavilán Caminero", lat: 4.6610, lng: -74.0935, info: "Rapaz común. Se le ve en áreas abiertas y urbanas cazando pequeños animales." },
                { name: "Jilguero Andino", lat: 4.6570, lng: -74.0985, info: "Se alimenta principalmente de semillas. Frecuente en zonas con arbustos." },
                { name: "Tirano Norteño", lat: 4.6600, lng: -74.0915, info: "Ave migratoria que caza insectos al vuelo. Observado en áreas abiertas del parque." },
                { name: "Vireo Ojirrojo", lat: 4.6580, lng: -74.0925, info: "Habita en bosques y arboledas, se alimenta de insectos." },
                { name: "Carpa", lat: 4.657142549557534, lng: -74.09542815978745, info: "Pez de agua dulce, abundante en los lagos y cuerpos de agua del parque." }
            ];

            animalsData.forEach(function(animal) {
                L.marker([animal.lat, animal.lng]).addTo(map_datos)
                    .bindPopup("<b>" + animal.name + "</b><br>" + animal.info);
            });
            map_datos.invalidateSize(); // Asegura que el mapa se renderice correctamente
        } else {
            console.log("Element with ID 'map-index' not found. Skipping datos.html map initialization.");
        }
    }

    // --- Inicialización del mapa para addpoint.html (id="map") ---
    function initAddPointMap() {
        var mapElement = document.getElementById('map'); // El ID del mapa en addpoint.html
        if (mapElement) {
            console.log("Initializing map for addpoint.html (ID: map)");
            // Centra el mapa en el Parque Simón Bolívar para facilitar la selección de puntos
            var map_addpoint = L.map('map').setView([4.6580, -74.0920], 14); 

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map_addpoint);

            var marker; // Para almacenar el marcador único al hacer clic

            map_addpoint.on('click', function(e) {
                // Elimina el marcador existente si hay uno
                if (marker) {
                    map_addpoint.removeLayer(marker);
                }
                // Añade un nuevo marcador en la ubicación del clic
                marker = L.marker(e.latlng).addTo(map_addpoint);
                marker.bindPopup("Lat: " + e.latlng.lat.toFixed(6) + "<br>Lng: " + e.latlng.lng.toFixed(6)).openPopup();

                // Actualiza los campos de latitud y longitud en el formulario
                document.getElementById('latitud').value = e.latlng.lat.toFixed(6);
                document.getElementById('longitud').value = e.latlng.lng.toFixed(6);
            });
            map_addpoint.invalidateSize(); // Asegura que el mapa se renderice correctamente
        } else {
            console.log("Element with ID 'map' not found. Skipping addpoint.html map initialization.");
        }
    }

    // Llama a las funciones de inicialización de mapas
    // Se ejecutarán si los elementos HTML correspondientes existen en la página actual.
    initDatosMap();
    initAddPointMap();
});