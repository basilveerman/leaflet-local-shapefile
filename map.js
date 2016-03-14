
var m = new L.map('map');

if (!location.hash) {
    m.setView([60, -100], 4);
}

var osmUrl='http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpeg';
var osmAttrib='Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {
    minZoom: 4,
    maxZoom: 12,
    attribution: osmAttrib,
    subdomains: '1234'
}).addTo(m);

m.addHash();