import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputFieldGroup from './InputFieldGroup'

class HospitalCard extends Component {
    constructor(props){
        super(props);        
        this.state = {
            edit_mode: false,
            hospital_name_edit_mode: false,
            hospital: {},
            updatedHospital: {}
        }
        this.editHospital = this.editHospital.bind(this);
        this.onChange = this.onChange.bind(this);
        this.enableHospitalNameEdit = this.enableHospitalNameEdit.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.saveHospital = this.saveHospital.bind(this);
    }  
    editHospital(e) {
        this.setState({ edit_mode: !this.state.edit_mode });
    }
    onChange(e) {        
        let updatedHospital = this.state.updatedHospital;
        let key = e.target.name;
        let value = e.target.value;
        updatedHospital[key] = value;
        this.setState({ updatedHospital })      
    }
    cancelChanges(e) {        
        this.setState({ 
            hospital_name_edit_mode: !this.state.hospital_name_edit_mode,
            updatedHospital: this.state.hospital
        });
    }
    saveHospital() {

    }
    enableHospitalNameEdit() {
        this.setState({ hospital_name_edit_mode: !this.state.hospital_name_edit_mode })
    }
    componentWillReceiveProps(props) {
        this.setState({ hospital: props.active_hospital })
    }
    render() {
        const hospital = this.state.hospital;    
        const saveButton = <button className="btn-success btn">Save</button>   
        const cancelButton = <button className="btn btn-default" onClick={ this.cancelChanges }>Cancel</button>
        const saveButtonGroup = <div className="form-group">{cancelButton}{saveButton}</div>
        const editButton = <button className="btn btn-primary" onClick={ this.editHospital }>Edit</button>
        const hospital_header = <div className="hospital-header"><h2>{hospital.name}</h2><i onClick={this.enableHospitalNameEdit} className="fa fa-pencil fa-2x" aria-hidden="true"></i></div>
        const edit_hospital_name = 
            <div>
                <label className="control-label">Hospital name</label>
                <div className="form-group input-group">
                    <input 
                        value={hospital.name}
                        name="name"
                        className="form-control"
                        onChange={this.onChange}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-default" onClick={ this.cancelChanges }>Cancel</button>
                        <button className="btn btn-primary" onClick={ this.saveHospital }>Update</button>
                    </span>
                </div>
            </div>
        return (
            <div className="hospital-card">
                { this.state.hospital_name_edit_mode ? edit_hospital_name : hospital_header }
                <hr/>
                <div>
                    <InputFieldGroup 
                        field="accounting_number"
                        value={hospital.accounting_number}
                        onChange={this.onChange}
                        label="Accounting Number"
                        disabled={!this.state.edit_mode}
                    />
                    <InputFieldGroup 
                        field="city"
                        value={hospital.city}
                        onChange={this.onChange}
                        label="City"
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