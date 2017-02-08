import React, { Component } from 'react';


class HospitalList extends Component {
    fetchHospitals(hospitals){
        return(
            <table>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        )
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