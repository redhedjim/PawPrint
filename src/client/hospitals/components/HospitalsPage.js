import React, { Component } from 'react';
import { connect } from 'react-redux';
import HospitalCard from './HospitalCard';
import HospitalList from './HospitalList';
import { fetchHospitals } from '../actions/hospitalActions';

import axios from 'axios';

class HospitalsPage extends Component {
    constructor(props){
        super(props);
        state: {
            hospitals: [];
        }
    }
    
    componentWillMount(){
        this.setState({hospitals: this.props.fetchHospitals({"pms": "Cornerstone"})});
    }

    render() {
        return (
            <div>
                <div className="col-sm-12">
                    <h1 className="text-center">Hospitals</h1>
                </div>
                <div className="col-sm-6"><HospitalCard /></div>
                <div className="col-sm-6"><HospitalList hospitals={this.state.hospitals}/></div>
            </div>
        );
    }
}
HospitalsPage.propTypes = {
    fetchHospitals: React.PropTypes.func.isRequired
}

export default connect(null, { fetchHospitals })(HospitalsPage);
