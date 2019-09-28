import L from 'leaflet'

const markerIcon = (url) => new L.Icon({
    iconUrl: url,
    iconRetinaUrl: url,
    iconAnchor: [20, 20],
    popupAnchor: [10, -44],
    iconSize: [40, 40],
});

export default markerIcon;
