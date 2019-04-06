import React from 'react';
import PropTypes from 'prop-types';

import './form.css';

const Form = function (props) {
    const { cb } = props;
    function callback() {
        const input = document.getElementById('name-input');
        cb({ name: input.value });
    }
    return (
        <div className='form'>
            <input id="name-input" type='text' className='form-input' ></input>
            <button onClick={callback}>Insert Name</button>
        </div>
    );
};

Form.defaultProps = {
};

Form.propTypes = {
    cb: PropTypes.func.isRequired
};

export default Form;
