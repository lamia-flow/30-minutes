import React from "react";
import "leaflet/dist/leaflet.css";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";

const windowSizing = () => ({
    height: `1000px`,
    width: `1000px`
  });

class ThirtyMinutesMap extends React.Component {

  componentDidMount() {
    console.log("Map get mounted")
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng) {
      return true;
    }
  }
  render() {

    const position = [this.props.lat, this.props.lng];
    return (
        <Map center={position} zoom={16} style={windowSizing()}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Circle center={position} radius="500"></Circle>
        </Map>
      );
  }
}

export default ThirtyMinutesMap