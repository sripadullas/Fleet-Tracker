// ==========================================
// map.js
// Leaflet OpenStreetMap Module
// ==========================================

let map;
let markerGroup;

let lightLayer;
let darkLayer;

// -----------------------------
// Initialize Map
// -----------------------------

function initializeMap(data) {

    if (map) {
        map.remove();
    }

    map = L.map("map", {
        zoomControl: true
    }).setView([17.3850, 78.4867], 11);

    lightLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap"
        }
    );

    darkLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
            maxZoom: 20,
            attribution: "&copy; CartoDB"
        }
    );

    if (document.body.classList.contains("dark")) {
        darkLayer.addTo(map);
    } else {
        lightLayer.addTo(map);
    }

    markerGroup = L.markerClusterGroup();

    map.addLayer(markerGroup);

    updateMap(data);
}

// -----------------------------
// Update markers
// -----------------------------

function updateMap(data) {

    if (!markerGroup) return;

    markerGroup.clearLayers();

    let bounds = [];

    data.forEach(bus => {

        const lat = Number(bus.Latitude);
        const lng = Number(bus.Longitude);

        if (isNaN(lat) || isNaN(lng))
            return;

        const marker = L.circleMarker(
            [lat, lng],
            {

                radius: 8,

                weight: 2,

                color: getMarkerColor(bus.Type),

                fillColor: getMarkerColor(bus.Type),

                fillOpacity: 0.85

            });

        marker.bindPopup(createPopup(bus));

        markerGroup.addLayer(marker);

        bounds.push([lat, lng]);

    });

    if (bounds.length > 0) {

        map.fitBounds(bounds, {
            padding: [40, 40]
        });

    }

}

// -----------------------------
// Popup
// -----------------------------

function createPopup(bus) {

    return `
        <div style="min-width:220px">

        <h3>${bus.Vehicle || "-"}</h3>

        <hr>

        <b>Type:</b> ${bus.Type || "-"}<br>

        <b>Depot:</b> ${bus.Depot || "-"}<br>

        <b>Engine:</b> ${bus.Engine || "-"}<br>

        <b>Route:</b> ${bus.Route || "-"}<br>

        <b>Latitude:</b> ${bus.Latitude}<br>

        <b>Longitude:</b> ${bus.Longitude}

        </div>
    `;

}

// -----------------------------
// Marker Colors
// -----------------------------

function getMarkerColor(type) {

    if (!type)
        return "#1976d2";

    type = type.toLowerCase();

    if (type.includes("ordinary"))
        return "#4CAF50";

    if (type.includes("metro express"))
        return "#F57C00";

    if (type.includes("metro deluxe"))
        return "#D32F2F";

    if (type.includes("ev"))
        return "#00BCD4";

    return "#3F51B5";

}

// -----------------------------
// Theme Switch
// -----------------------------

function switchMapTheme(dark) {

    if (!map) return;

    if (dark) {

        map.removeLayer(lightLayer);

        darkLayer.addTo(map);

    }
    else {

        map.removeLayer(darkLayer);

        lightLayer.addTo(map);

    }

}

// -----------------------------
// Zoom to Bus
// -----------------------------

function zoomToBus(vehicleNumber) {

    markerGroup.eachLayer(function(marker){

        const html = marker.getPopup().getContent();

        if(html.includes(vehicleNumber)){

            map.setView(
                marker.getLatLng(),
                16
            );

            marker.openPopup();

        }

    });

}

// -----------------------------
// Fullscreen helper
// -----------------------------

function fitAllMarkers(){

    const group = markerGroup.getBounds();

    if(group.isValid()){

        map.fitBounds(group);

    }

}
