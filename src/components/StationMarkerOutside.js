import React from "react";
import {
  Marker,
  Popup,
} from "react-leaflet";
import markerIcon from '../leaflet/markerIcon';

const StationMarkerOutside = ({ station, onClick, center }) => {
    const icon = markerIcon(require('../icon/notgonnamakeit.svg'));

    return (
        <Marker position={[station.y, station.x]} icon={icon} onClick={onClick}>
            <Popup >{station.name}</Popup>
        </Marker>
    );
}

export default StationMarkerOutside;
