import React from "react";
import "leaflet/dist/leaflet.css";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from 'leaflet'
import StationsList from './components/StationsList';
import markerIcon from './leaflet/markerIcon';
import StationArea from './components/StationArea';

const windowSizing = () => ({
    height: `100vh`,
    width: `100vw`
});    
  
class ThirtyMinutesMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      area: {
        center: {
          lat: null,
          lng: null,
        },
        radius: 3000,
        areaLat: null,
        areaLng: null,
      },
    };
  }

  newCenter(prevState) {
    const {lat, lng} = this.state.area.center;
    const {lat: prevLat, lng: prevLng} = prevState.area.center;

    return lat !== prevLat || lng !== prevLng;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng || prevProps.stations !== this.props.stations || this.newCenter(prevState)) {
      return true;
    }

    return false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng || nextProps.stations !== this.props.stations || this.newCenter(nextState)) {
      return true;
    }

    return false;
  }

  stationsInsideCircle = (stations, center) => {
    const centerLatLng = new L.latLng(center);

    return stations.map(station => {
      station.isInside = (centerLatLng.distanceTo([station.y, station.x]) < this.state.area.radius)
        ? true
        : false;

      return station;
    });
  }

  onStationSelect = station => () => {
    const {y: lat, x: lng} = station;

    this.setState({
      area: {
        center: {lat, lng},
        radius: 3000, // @todo reserve this from original?
      },
      areaLat: lat,
      areaLng: lng,
    });
  }

  render() {
    const locationMarkerIcon = markerIcon(require('./icon/map-marker.svg'));
    const position = [this.props.lat, this.props.lng];
    const {stations} = this.props;
    const {center} = this.state.area;

    return (
        <Map center={position} zoom={13} style={windowSizing()}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png"
          />
          <StationsList stations={this.stationsInsideCircle(stations, this.state.area.center)} stationSelect={this.onStationSelect} />
          <Marker position={position} icon={locationMarkerIcon}>
            <Popup>You are here</Popup>
          </Marker>
          <StationArea key={center} center={center} radius={this.state.area.radius} />
        </Map>
      );
  }
}

export default ThirtyMinutesMap
