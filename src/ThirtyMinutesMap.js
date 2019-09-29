import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "leaflet/dist/leaflet.css";
import {
  Map,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
  Circle
} from "react-leaflet";
import Leaflet from "leaflet";
import L from "leaflet";
import stationIcon from "./icon/citybike.svg";

const windowSizing = () => ({
  height: `100vh`,
  width: `100vw`
});

export const pointerIcon = new L.Icon({
  iconUrl: require("./icon/citybike.svg"),
  iconRetinaUrl: require("./icon/citybike.svg"),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 45]
});

const MyPopupMarker = ({ station, position }) => {
  const ROUTE_QUERY = gql`
  {
    plan(
      fromPlace: "${position[0]},${position[1]}"
      toPlace: "${station.y},${station.x}"
      numItineraries: 1
      transportModes: [{ mode: BICYCLE, qualifier: RENT }, { mode: WALK }]
    ) {
      itineraries {
        walkDistance
        duration
        legs {
          mode
          startTime
          endTime
          from {
            lat
            lon
            name
            bikeRentalStation {
              stationId
              name
            }
          }
          to {
            lat
            lon
            name
            bikeRentalStation {
              stationId
              name
            }
          }
          distance
          legGeometry {
            length
            points
          }
        }
      }
    }
  }
`;
  const { data } = useQuery(ROUTE_QUERY);
  data && console.log(data)
  const duration =
    data && data.plan.itineraries[0] && (data.plan.itineraries[0].duration/60);
  const walkDistance =
    data && data.plan.itineraries[0] && data.plan.itineraries[0].walkDistance;
  if (duration < 30) {
    return (
      <Marker position={[station.y, station.x]} icon={pointerIcon}>
        <Popup>
          <div>{station.name}</div>
          <div>Num. of Bikes: {station.bikesAvailable}</div>
          <div>Duration: {duration}</div>
          <div>Distance: {walkDistance}</div>
        </Popup>
      </Marker>
    );
  }
  return (
    <Marker position={[station.y, station.x]} icon={pointerIcon}>
        <Popup>
          <div>TOO FAR : {station.name}</div>
          <div>Num. of Bikes: {station.bikesAvailable}</div>
          <div>Duration: {duration}</div>
          <div>Distance: {walkDistance}</div>
        </Popup>
      </Marker>
  )
};

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
    if (this.props.stations.stations.length > 0) {
      const items = this.props.stations.stations.map(station => (
        <MyPopupMarker
          key={station.id}
          station={station}
          position={this.props.position}
        />
      ));
      return <Fragment>{items}</Fragment>;
    }
    return <div>Empty</div>;
  }
}

class ThirtyMinutesMap extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.lat !== this.props.lat ||
      prevProps.lng !== this.props.lng ||
      prevProps.stations !== this.props.stations
    ) {
      return true;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.lat !== this.props.lat ||
      nextProps.lng !== this.props.lng ||
      nextProps.stations !== this.props.stations
    ) {
      return true;
    }
  }

  onStationClick(e) {
    // center circle on clicked station
    // do some magic to define the paths etc.....
  }

  render() {
    const position = [this.props.lat, this.props.lng];
    const { stations } = this.props;
    return (
      <Map center={position} zoom={13} style={windowSizing()}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png"
        />
        {stations && <MyMarkersList stations={stations} position={position} />}
        <CircleMarker center={position} radius={6} />
        <Circle center={position} radius={4000}></Circle>
      </Map>
    );
  }
}

export default ThirtyMinutesMap;
