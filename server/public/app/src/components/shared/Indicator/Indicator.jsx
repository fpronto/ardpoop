import React from 'react';
import PropTypes from 'prop-types';
import poopHappy from '../../../assets/poop_happy.svg';
import poopSad from '../../../assets/poop_sad.svg';

import './indicator.css';

const Indicator = (props) => {
    const { status } = props;
    const happy = 'You can go now';
    const sad = 'Houston, we have a problem';
    return (
        <div className='indicator'>
            <img src={status ? poopHappy : poopSad} className="App-logo" alt="logo" />
            <span className="indicator-text">{ status ? happy : sad }</span>
        </div>
    );
};

Indicator.defaultProps = {
};

Indicator.propTypes = {
    status: PropTypes.bool.isRequired
};


export default Indicator;
