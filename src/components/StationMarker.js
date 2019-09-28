import React from "react";
import {
  Marker,
  Popup,
} from "react-leaflet";
import markerIcon from '../leaflet/markerIcon';

const StationMarker = ({ station }) => {
    const icon = station.isInside 
        ? markerIcon(require('../icon/citybike.svg'))
        : markerIcon(require('../icon/notgonnamakeit.svg'));

    return (
        <Marker position={[station.y, station.x]} icon={icon}>
            <Popup >{station.name}</Popup>s
        </Marker>
    );
}

export default StationMarker;
