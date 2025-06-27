// /static/js/mapa.js

// Coordenadas para el polígono del Parque Simón Bolívar
// Definidas una sola vez para ser usadas por ambos mapas si es necesario
var simonBolivarPolygonCoords = [
    [4.665240247321227, -74.09344582157698],
    [4.659557312267196, -74.08929577543982],
    [4.65236365771485, -74.09304886064211],
    [4.6571474461861175, -74.10023024482727],
    [4.665240247321227, -74.09344582157698] // Cierra el polígono volviendo al primer punto
];


// Lógica para el mapa en addpoint.html (id="map")
if (document.getElementById('map')) {
    // Inicializa el mapa para addpoint.html
    var map = L.map('map').setView([4.658284236465639, -74.09339574427796], 13); // Centrado en Bogotá

    // Añade la capa de OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Variable para almacenar el marcador actual
    var currentMarker = null;

    // Referencias a los campos de latitud y longitud en el formulario
    var latInput = document.getElementById('latitud');
    var lngInput = document.getElementById('longitud');

    // Función para manejar el evento de hacer clic en el mapa
    function onMapClick(e) {
        // Si ya hay un marcador, lo removemos
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }

        // Crea un nuevo marcador en las coordenadas del clic
        currentMarker = L.marker(e.latlng).addTo(map)
            .bindPopup("Ubicación seleccionada")
            .openPopup();

        // Actualiza los campos de latitud y longitud en el formulario
        latInput.value = e.latlng.lat.toFixed(6); // Redondea a 6 decimales
        lngInput.value = e.latlng.lng.toFixed(6); // Redondea a 6 decimales
    }

    map.on('click', onMapClick);

    // *******************************************************************
    // NUEVO CÓDIGO: Dibuja la polilínea del Parque Simón Bolívar en addpoint.html
    var simonBolivarOutline = L.polyline(simonBolivarPolygonCoords, {
        color: '#2e7d32',   // Color verde oscuro para el borde
        weight: 3,         // Grosor de la línea
        opacity: 0.7       // Opacidad de la línea
    }).addTo(map);

    // Opcional: Centrar el mapa para que la polilínea sea visible si se desea
    // map.fitBounds(simonBolivarOutline.getBounds());
    // Nota: Descomenta la línea de arriba si quieres que el mapa se centre
    // automáticamente en el parque al cargar addpoint.html. Sin embargo,
    // es posible que prefieras el centrado en Bogotá para facilitar la navegación general.
    // *******************************************************************
}


// Lógica para el mapa en index.html (id="map-index")
if (document.getElementById('map-index')) {
    // Las coordenadas ya están definidas globalmente arriba: simonBolivarPolygonCoords

    // Inicializa el mapa para el index
    var mapIndex = L.map('map-index').setView([4.658, -74.094], 14); 

    // Añade la capa de OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapIndex);

    // Crea y añade el polígono al mapa (con relleno)
    var polygon = L.polygon(simonBolivarPolygonCoords, {
        color: '#1a4d2e', // Color del borde (verde oscuro)
        fillColor: '#2e7d32', // Color de relleno (verde un poco más claro)
        fillOpacity: 0.5    // Opacidad del relleno
    }).addTo(mapIndex);

    // Ajustar el zoom del mapa para que el polígono completo sea visible
    mapIndex.fitBounds(polygon.getBounds());

    // Opcional: Añadir un popup al polígono
    polygon.bindPopup("<b>Parque Metropolitano Simón Bolívar</b><br>Pulmón de Bogotá.");
}