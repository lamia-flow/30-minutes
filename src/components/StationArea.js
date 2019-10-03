import React from "react";
import {
  Circle
} from "react-leaflet";

const StationArea = ({ center, radius }) => {
    console.log(center, radius);

    if (!center.lat || !center.lng || !radius) {
      return <div>Empty</div>;
    }

    return (
        <Circle center={center} radius={radius} fill={false} color="#4258ce"></Circle>
    );
}

export default StationArea;
