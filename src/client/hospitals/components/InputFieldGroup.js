import React from 'react';

const InputFieldGroup = ({ field, value, label, type, disabled  }) => {
    return (
        <div className="form-group">
            <label className="control-label">{label}</label>
            <input 
                value={value}
                type={type}
                name={field}
                className="form-control"
                disabled={disabled}
            />
        </div>
    );
}

InputFieldGroup.propTypes = {
    field: React.PropTypes.any.isRequired,
    value: React.PropTypes.any.isRequired,
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired
}

InputFieldGroup.defaultProps = {
    type: 'text'
}

export default InputFieldGroup;