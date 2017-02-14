import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputFieldGroup from './InputFieldGroup'

class HospitalCard extends Component {
    constructor(){
        super();
        this.state = {
            edit_mode: false
        }
        this.editHospital = this.editHospital.bind(this);
    }
    editHospital(e) {
        this.setState({ edit_mode: !this.state.edit_mode });
    }
    render() {
        const hospital = this.props.active_hospital;    
        const saveButton = <button className="btn-success btn">Save</button>   
        const cancelButton = <button className="btn btn-default" onClick={this.editHospital}>Cancel</button>
        const saveButtonGroup = <div className="form-group">{cancelButton}{saveButton}</div>
        const editButton = <button className="btn btn-primary" onClick={this.editHospital}>Edit</button>
        return (
            <div className="hospital-card">
                <h2>{hospital.name}</h2>
                <hr/>
                <div>
                    <InputFieldGroup 
                        field={hospital.accounting_number}
                        value={hospital.accounting_number}
                        label="AU Number"
                        disabled={!this.state.edit_mode}
                    />
                    <InputFieldGroup 
                        field={hospital.phone1}
                        value={hospital.phone1}
                        label="Phone"
                        disabled={!this.state.edit_mode}
                    />
                    <InputFieldGroup 
                        field={hospital.fax}
                        value={hospital.phone2}
                        label="Fax"
                        disabled={!this.state.edit_mode}
                    />
                    {this.state.edit_mode ? saveButtonGroup : editButton}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        active_hospital: state.active_hospital
    }
}
export default connect(mapStateToProps)(HospitalCard);