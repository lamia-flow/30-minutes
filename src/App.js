import React from "react";
import "./App.css";
import ThirtyMinutesMap from "./ThirtyMinutesMap";
import axios from "axios";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lng: null,
      zoom: 13,
      stations: null
    };
  }

  getStationList = () => {
    axios
      .get("https://api.digitransit.fi/routing/v1/routers/hsl/bike_rental", {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        this.setState({
          stations: response.data
        });
      })
      .catch(() => {
        console.log("Failed to fetch the stations");
      });
  };

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
    this.getStationList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.lat !== this.state.lat ||
      prevState.lng !== this.state.lng ||
      prevState.stations !== this.state.stations
    ) {
      return true;
    }
  }

  render() {
    const { lat, lng, stations } = this.state;
    if (lat && lng) {
      return (
        <ApolloProvider client={client}>
          <ThirtyMinutesMap
            lat={lat}
            lng={lng}
            stations={stations}
            key={stations}
          />
        </ApolloProvider>
      );
    }
    return <div>Loading...</div>;
  }
}

export default App;
