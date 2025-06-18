// /static/js/programa.js

// Inicializa el mapa
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

