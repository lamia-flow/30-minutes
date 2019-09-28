import React, {Fragment} from "react";
import "leaflet/dist/leaflet.css";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import Leaflet from 'leaflet'
import L from 'leaflet'
import stationIcon from './icon/citybike.svg'
import tooFarIcon from './icon/notgonnamakeit.svg'
import locationIcon from './icon/youarehere.svg'

const windowSizing = () => ({
    height: `100vh`,
    width: `100vw`
  });

  export const pointerIcon = new L.Icon({
    iconUrl: require('./icon/citybike.svg'),
    iconRetinaUrl: require('./icon/citybike.svg'),
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 45],
  })
  export const notPointerIcon = new L.Icon({
    iconUrl: require('./icon/citybike.svg'),
    iconRetinaUrl: require('./icon/notgonnamakeit.svg'),
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 45],
  })

  const MyPopupMarker = ({ station }) => {

    const icon = station.isInside 
      ? pointerIcon
      : notPointerIcon;

    return (
    <Marker position={[station.y, station.x]} icon={icon}>
      <Popup >{station.name}</Popup>s
    </Marker>
    
  )}
  
  class MyMarkersList extends React.Component {
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.stations !== this.props.stations) {
        return true;
      }
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.stations !== this.props.stations) {
        return true;
      }
    }

    render() {
      console.log("My marker list", this.props.stations)
   
      if(this.props.stations.length > 0) {
        const items = this.props.stations.map(station => (
          <MyPopupMarker key={station.id} station={station} />
        ))
        return <Fragment>{items}</Fragment>
      }
      return <div>Empty</div>
    }
  } 
    
  
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
    return stations.filter(station => {
      return centerLatLng.distanceTo([station.y, station.x]) < 2000;
    });
  }

  // lat y
  // lng x
  insideCircle(x, y, center_x, center_y, radius) {
    return Math.sqrt(x - center_x) + Math.sqrt(y - center_y) <= Math.sqrt(radius);
  }

  render() {
      // @todo: somewhere else
     const locationMarkerIcon = Leaflet.icon({
      iconUrl: locationIcon,
      iconSize: [35, 35],
      iconAnchor: [15.5, 15.5],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    const position = [this.props.lat, this.props.lng];
    const {stations} = this.props.stations;
    
    // Latitude: 1 deg = 110.574 km

    return (
        <Map center={position} zoom={13} style={windowSizing()}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png"
          />
          {stations && <MyMarkersList stations={this.stationsInsideCircle(stations, position)}/>}
          <Marker position={position} icon={locationMarkerIcon}>
            <Popup>You are here</Popup>
          </Marker>
          <Circle center={position} radius={2000}></Circle>
        </Map>
      );
  }
}

export default ThirtyMinutesMap
