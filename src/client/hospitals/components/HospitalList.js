import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setActiveHospital } from '../actions/hospitalActions';

class HospitalList extends Component {
    constructor(){
        super();
        this.state = {
            search_term: ''
        }
        this.onSearchInput = this.onSearchInput.bind(this);
        this.showActiveHospital = this.showActiveHospital.bind(this);
    }
    onSearchInput(e) {
        this.setState({ search_term: e.target.value});
    }
    showActiveHospital(e){
        const active_hospital = this.props.hospitals[0].filter((hospital) => {            
            return hospital.id == e.currentTarget.id;
        });
        this.props.setActiveHospital(active_hospital)      
    }
    render() {   
        if (!this.props.hospitals || !this.props.hospitals.length) {
            return null;
        }else{   
            const hospitals = this.props.hospitals[0].filter((hospital) =>{
                const matchesSearch = (field) => {
                    return field.toString().toLowerCase().indexOf(this.state.search_term)!=-1;
                }
                return (
                    matchesSearch(hospital.name) ||
                    matchesSearch(hospital.accounting_number) ||
                    matchesSearch(hospital.city)
                )
            }).map((hospital) =>{
                return (
                    <tr key={hospital.id} id={hospital.id} onClick={this.showActiveHospital}>
                        <td>{hospital.accounting_number}</td>
                        <td>{hospital.name}</td>
                        <td>{hospital.city}</td>
                    </tr>
                )
            })
            return (
                
                <div className="hospital-list">
                    <input 
                        className="form-control"
                        placeholder="Search..." 
                        value={this.state.search_term}
                        onChange={this.onSearchInput}
                    ></input>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <td>Clinic Number</td>
                                <td>Name</td>
                                <td>City</td>
                            </tr>
                        </thead>
                        <tbody>{hospitals}</tbody>
                    </table>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
  return {
      hospitals: state.hospitals,
      active_hospital: state.active_hospital
  }
}

export default connect(mapStateToProps, { setActiveHospital })(HospitalList);
