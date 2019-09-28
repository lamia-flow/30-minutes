import React from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, Popup, Circle, DivOverlay } from 'react-leaflet';
import { jsxClosingElement } from '@babel/types';

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
    }

  }

  componentDidMount() {
    const {latitude: lat, longitude: lng} = this.getCoords();
  
    this.setState({
      lat,
      lng,
    })
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
              A pretty CSS3 popup. <br/> Easily customizable.
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

