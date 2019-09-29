import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "leaflet/dist/leaflet.css";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Circle
} from "react-leaflet";
import Leaflet from 'leaflet'
import L from 'leaflet'
import locationIcon from './icon/youarehere.svg'

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
export const notPointerIcon = new L.Icon({
  iconUrl: require('./icon/citybike.svg'),
  iconRetinaUrl: require('./icon/notgonnamakeit.svg'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 45],
})

const MyPopupMarker = ({ station, position }) => {
  const icon = station.isInside 
      ? pointerIcon
      : notPointerIcon;
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
    data && data.plan.itineraries[0] && (data.plan.itineraries[0].duration);
  const walkDistance =
    data && data.plan.itineraries[0] && data.plan.itineraries[0].walkDistance;
  if ((duration/60) < 30) {
    return (
      <Marker position={[station.y, station.x]} icon={icon}>
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
    <Marker position={[station.y, station.x]} icon={icon}>
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
      if(this.props.stations && this.props.stations.length > 0) {
        const items = this.props.stations.map(station => (
          <MyPopupMarker key={station.id} station={station} position={this.props.position} />
        ))
        return <Fragment>{items}</Fragment>
      }
      return <div>Empty</div>
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

  stationsInsideCircle = (stations, center) => {
    const centerLatLng = new L.latLng(center);
    return stations.filter(station => {
      return centerLatLng.distanceTo([station.y, station.x]) < 6000;
    });
  }

  // lat y
  // lng x
  insideCircle(x, y, center_x, center_y, radius) {
    return Math.sqrt(x - center_x) + Math.sqrt(y - center_y) <= Math.sqrt(radius);
  }

  render() {
      // @todo: somewhere else
     const locationMarkerIcon = Leaflet.icon({
      iconUrl: locationIcon,
      iconSize: [35, 35],
      iconAnchor: [15.5, 15.5],
      popupAnchor: [-3, -26],
      shadowSize: [20, 20],
      shadowAnchor: [22, 24]
    });

    const position = [this.props.lat, this.props.lng];
    const {stations} = this.props
    console.log(stations)
    // Latitude: 1 deg = 110.574 km

    return (
        <Map center={position} zoom={11} style={windowSizing()}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png"
          />
          {this.props.stations && stations && <MyMarkersList stations={this.stationsInsideCircle(stations, position)} position={position}/>}
          <Marker position={position} icon={locationMarkerIcon}>
            <Popup>You are here</Popup>
          </Marker>
          <Circle center={position} radius={6000}></Circle>
        </Map>
      );
  }
}

export default ThirtyMinutesMap;
