import React, {Fragment} from "react";
import StationMarkerInside from './StationMarkerInside';
import StationMarkerOutside from './StationMarkerOutside';

class StationsList extends React.Component {
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
      const { stationSelect, center, stations } = this.props;
      const stationsInside = stations.filter(station => station.isInside);
      const stationsOutside = stations.filter(station => !station.isInside);
      if(this.props.stations.length > 0) {
        const stationsInsideItems = stationsInside.map(station => (
          <StationMarkerInside center={center} key={station.id} station={station} onClick={stationSelect(station)} />
        ))
        const stationsOutsideItems = stationsOutside.map(station => (
          <StationMarkerOutside center={center} key={station.id} station={station} onClick={stationSelect(station)} />
        ))
        return <Fragment>{stationsInsideItems} {stationsOutsideItems}</Fragment>
      }
      return <div>Empty</div>
    }
  } 


  export default StationsList;
