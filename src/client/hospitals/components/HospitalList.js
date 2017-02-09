import React, { Component } from 'react';


class HospitalList extends Component {
    constructor(props){
        super(props);      
        console.log('hospitals!!!!!: ', props);  
    }
    render() {      
        return (
            <div>
                <h2>Hospitals</h2>
                <input placeholder="Search..."></input>
            </div>
        );
    }
}

export default HospitalList;