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

const windowSizing = () => ({
    height: `1000px`,
    width: `1000px`
  });
  const stationMarker = Leaflet.icon({
    iconUrl: 'https://place-hold.it/100x100',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });

  const MyPopupMarker = ({ station }) => (
    <Marker position={{lat:station.x, lng:station.lng}} icon={stationMarker}>
      <Popup>{station.name}</Popup>
    </Marker>
    
  )
  
  const MyMarkersList = (props) => {
    if(props.stations.length > 0) {
      const items = props.stations.stations.map(station => (
        <MyPopupMarker key={station.id} station={station} />
      ))
      return <Fragment>{items}</Fragment>
    }
    return <div>Empty</div>
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

  getDerived
  render() {

    const position = [this.props.lat, this.props.lng];
    const {stations} = this.props
    return (
        <Map center={position} zoom={16} style={windowSizing()}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
      {stations && <MyMarkersList key={stations} stations={stations}/>}
          <Circle center={position} radius="500"></Circle>
        </Map>
      );
  }
}

export default ThirtyMinutesMap