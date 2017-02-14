import React, { Component } from 'react';
import { connect } from 'react-redux';
import HospitalCard from './HospitalCard';
import HospitalList from './HospitalList';
import { fetchHospitals } from '../actions/hospitalActions';

import axios from 'axios';

class HospitalsPage extends Component {
    
    componentWillMount() {
        this.setState({hospitals: this.props.fetchHospitals()});      
    }
  
    render() {
        return (
            <div>
                <div className="col-sm-12">
                    <h1 className="text-center">Hospitals</h1>
                </div>
                <div className="col-sm-6"><HospitalCard /></div>
                <div className="col-sm-6"><HospitalList /></div>
            </div>
        );
    }
}

HospitalsPage.propTypes = {
    fetchHospitals: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
      hospitals: state.hospitals,
      active_hospital: state.active_hospital
  }
}
export default connect(mapStateToProps, { fetchHospitals })(HospitalsPage);
