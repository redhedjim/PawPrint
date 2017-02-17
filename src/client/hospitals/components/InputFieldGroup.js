import React from 'react';

const InputFieldGroup = ({ field, value, label, type, onChange, disabled  }) => {
    return (
        <div className="form-group">
            <label className="control-label">{label}</label>
            <input 
                value={value}
                type={type}
                name={field}
                className="form-control"
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
}

InputFieldGroup.propTypes = {
    field: React.PropTypes.any.isRequired,
    value: React.PropTypes.any.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    type: React.PropTypes.string.isRequired
}

InputFieldGroup.defaultProps = {
    type: 'text'
}

export default InputFieldGroup;