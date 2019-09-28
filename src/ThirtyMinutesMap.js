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

  const MyPopupMarker = ({ station }) => {

    return (
    <Marker position={[station.y, station.x]} icon={pointerIcon}>
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
      if(this.props.stations.stations.length > 0) {
        const items = this.props.stations.stations.map(station => (
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

  onStationClick(e) {
      // center circle on clicked station
      // do some magic to define the paths etc.....
  }

  render() {
      // @todo: somewhere else
     const stationMarker = Leaflet.icon({
      iconUrl: stationIcon,
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    const position = [this.props.lat, this.props.lng];
    const {stations} = this.props
    return (
        <Map center={position} zoom={16} style={windowSizing()}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png"
          />
      {stations && <MyMarkersList stations={stations}/>}
          <Circle center={position} radius={100}></Circle>
        </Map>
      );
  }
}

export default ThirtyMinutesMap
