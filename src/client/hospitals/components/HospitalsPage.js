import React, { Component } from 'react';
import HospitalCard from './HospitalCard';
import HospitalList from './HospitalList';
import axios from 'axios';

class HospitalsPage extends Component {
    constructor(props){
        super(props);

    }
    
    componentWillMount(){
        axios.get('/api/events').then((results) => {
            console.log('Results: ', results);
            
        });
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

export default HospitalsPage;