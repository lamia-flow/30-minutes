import React from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, Popup, Circle, DivOverlay } from 'react-leaflet';
import { jsxClosingElement } from '@babel/types';
import axios from 'axios';

const windowSizing = () => ({
  height: `1000px`,
  width: `1000px`,
});



class ThirtyMinutesMap extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      lat: null,
      lng: null,
      zoom: 13,
      stations: null
    }

  }

  componentDidMount() {
    this.getStationList();
  };

  getStationList = () => {
    axios.get('https://api.digitransit.fi/routing/v1/routers/hsl/bike_rental', {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        this.setState({
          stations: response.data
        })
      }).finally(() => { });
  };

  getCoords = () => {
    // get coords
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    if (position.lat && position.lng) {
      return (
        <Map center={position} zoom={this.state.zoom} style={windowSizing()}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Circle center={position} radius="500">
          </Circle>
        </Map>
      );
    }

    return (<div>Loading...</div>);
  }
}

export default ThirtyMinutesMap;

