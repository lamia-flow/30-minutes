import React from "react";
import "leaflet/dist/leaflet.css";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import Leaflet from 'leaflet';
import stationIcon from './icon/citybike.svg'

const windowSizing = () => ({
  height: `100vh`,
  width: `100vw`
});

class ThirtyMinutesMap extends React.Component {

    /*constructor(props) {
        super(props);
        this.state = {
            circleposition: null
        };
        this.onStationClick = this.onStationClick.bind(this);
    }*/

  componentDidMount() {
    console.log("Map get mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng) {
      return true;
    }
  }

  /*onStationClick(e) {
            this.setState({
                circleposition: [this.props.lat, this.props.lng]
            });
  }*/

  render() {
      // @todo: somewhere else
     const stationMarker = Leaflet.icon({
      iconUrl: stationIcon,
      iconSize: [35, 35],
      iconAnchor: [15.5, 15.5],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });

    const position = [this.props.lat, this.props.lng];
    return (
        <Map center={position} zoom={16} style={windowSizing()}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png"
          />
          <Marker 
            position={position}
            icon={stationMarker}
            onClick={this.onStationClick}
            >
            
          </Marker>
          <Circle center={position} radius={100}></Circle>
        </Map>
      );
  }
}

export default ThirtyMinutesMap
