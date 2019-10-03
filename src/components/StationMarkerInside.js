import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  Marker,
  Popup,
} from "react-leaflet";
import markerIcon from '../leaflet/markerIcon';

const StationMarkerInside = ({ station, onClick, center }) => {
    const icon = markerIcon(require('../icon/citybike.svg'));

        const position = [center.lat, center.lng];


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
        console.log(data);
        const duration =
        data && data.plan.itineraries[0] && (data.plan.itineraries[0].duration);
        const walkDistance =
        data && data.plan.itineraries[0] && data.plan.itineraries[0].walkDistance;



    return (
        <Marker position={[station.y, station.x]} icon={icon} onClick={onClick}>
            <Popup >{station.name}</Popup>
        </Marker>
    );
}

export default StationMarkerInside;
