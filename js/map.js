// load a tile layer
var porto = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    minZoom: 2,
});

var lisboa = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    minZoom: 2,
});

// initialize the map
var map = L.map('map', {center: [10.0, 0.0], zoom: 2, layers: [/* an, as, af, oc, */ porto, lisboa]});

// custom markers icons
var dancasIcon = L.icon({
    iconUrl: './assets/img/marker1.png',
    iconSize: [30, 45],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});

var graffitiIcon = L.icon({
    iconUrl: './assets/img/marker2.png',
    iconSize: [30, 45],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});

var eventosIcon = L.icon({
    iconUrl: './assets/img/marker3.png',
    iconSize: [30, 45],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});

var outrosIcon = L.icon({
    iconUrl: './assets/img/marker4.png',
    iconSize: [30, 45],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});

// custom disclaim on all markers
function onEachFeature(feature, layer) {
    var popupContent = "<b>Encontra Cultura!</b><br>";

    if (feature.properties && feature.properties.popupContent
        + feature.properties.name
        + feature.properties.location
        + feature.properties.description
        + feature.properties.imageUrl
        + feature.properties.imageCaption
        + feature.properties.facebookLink
        + feature.properties.whatsappLink
        + feature.properties.instagramLink)
        {
        popupContent += feature.properties.popupContent
        += feature.properties.name
        += feature.properties.location
        += feature.properties.description
        += feature.properties.imageUrl
        += feature.properties.imageCaption
        += feature.properties.facebookLink
        += feature.properties.whatsappLink
        += feature.properties.instagramLink;
    }

    layer.bindPopup(popupContent);
}

//Dança Markers
var dancas = L.geoJSON(dancas, {

    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: dancasIcon});
    },

    onEachFeature: onEachFeature
}).addTo(map);

//Graffiti Markers
var graffiti = L.geoJSON(graffiti, {

    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: graffitiIcon});
    },

    onEachFeature: onEachFeature
}).addTo(map);

//Eventos Markers
var eventos = L.geoJSON(eventos, {

    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: eventosIcon});
    },

    onEachFeature: onEachFeature
}).addTo(map);

//Outros Markers
var outros = L.geoJSON(outros, {

    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: outrosIcon});
    },

    onEachFeature: onEachFeature
}).addTo(map);

var baseLayers = {
    "Porto": porto,
    "Lisboa": lisboa,
};

var overlays = {
    "Danças": dancas,
    "Graffiti": graffiti,
    "Eventos": eventos,
    "Outros": outros
};

L.control.layers(baseLayers, overlays).addTo(map);
