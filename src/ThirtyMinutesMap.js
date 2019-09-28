import React, {Fragment} from "react";
import "leaflet/dist/leaflet.css";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import L from 'leaflet'
import StationsList from './components/StationsList';
import markerIcon from './leaflet/markerIcon';

const windowSizing = () => ({
    height: `100vh`,
    width: `100vw`
});    
  
class ThirtyMinutesMap extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng || prevProps.stations !== this.props.stations) {
      return true;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng || nextProps.stations !== this.props.stations) {
      return true;
    }
  }

  stationsInsideCircle = (stations, center) => {
    const centerLatLng = new L.latLng(center);

    return stations.map(station => {
      station.isInside = (centerLatLng.distanceTo([station.y, station.x]) < 2000)
        ? true
        : false;

      return station;
    });
  }

  render() {
    const locationMarkerIcon = markerIcon(require('./icon/map-marker.svg'));
    const position = [this.props.lat, this.props.lng];
    const { area } = this.props;
    const {stations} = this.props;

    return (
        <Map center={position} zoom={13} style={windowSizing()}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png"
          />
          {stations && <StationsList stations={this.stationsInsideCircle(stations, position)}/>}
          <Marker position={position} icon={locationMarkerIcon}>
            <Popup>You are here</Popup>
          </Marker>
          <Circle center={position} radius={3000}></Circle>
        </Map>
      );
  }
}

export default ThirtyMinutesMap
