import React from "react";
import ThirtyMinutesMap from './ThirtyMinutesMap';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lng: null,
      zoom: 13,
      stations: null,
    };
  }

  setCurrentLocation = () => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({coords}) => {

        const {latitude: lat, longitude: lng} = coords;

        this.setState({
          lat,
          lng,
        });
      });
    }
  }

  getStationList = () => {
    axios.get('https://api.digitransit.fi/routing/v1/routers/hsl/bike_rental', {
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(({ data }) => {
        const { stations } = data;
        this.setState({
          stations
        })
      }).catch(() => {console.log("Failed to fetch the stations")});
  };

  componentDidMount() {
    this.setCurrentLocation();
    this.getStationList()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lat !== this.state.lat || prevState.lng !== this.state.lng || prevState.stations !== this.state.stations) {
      return true;
    }
  }

  render() {
    const {lat, lng, stations, area} = this.state

    if(lat && lng && stations) {
      return <ThirtyMinutesMap lat={lat} lng={lng} stations={stations} key={stations} area={area} />;
    }

    return <div>Loading...</div>
  }
}

export default App;
