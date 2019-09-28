import React from "react";
import "./App.css";
import ThirtyMinutesMap from './ThirtyMinutesMap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lng: null,
      zoom: 13
    };
  }

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        console.log(coords);
        this.setState({
          lat: coords.latitude,
          lng: coords.longitude
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lat !== this.state.lat || prevState.lng !== this.state.lng) {
      return true;
    }
  }

  render() {
    const {lat, lng} = this.state
    if(lat && lng) {
      return <ThirtyMinutesMap lat={lat} lng={lng} />;
    }
    return <div>Loading...</div>
  }
}

export default App;
