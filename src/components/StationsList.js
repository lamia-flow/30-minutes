import React, {Fragment} from "react";

import StationMarker from './StationMarker';

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
      if(this.props.stations.length > 0) {
        const items = this.props.stations.map(station => (
          <StationMarker key={station.id} station={station} />
        ))
        return <Fragment>{items}</Fragment>
      }
      return <div>Empty</div>
    }
  } 


  export default StationsList;
