import React from 'react';
import PropTypes from 'prop-types';

import './smellindicator.css';

const SmellIndicator = (props) => {
    const { smellValue } = props;
    return (
        <div className='smell-indicator'>
            <span className='smell-indicator-value'>{smellValue}</span>
        </div>
    );
};

SmellIndicator.defaultProps = {
};

SmellIndicator.propTypes = {
    smellValue: PropTypes.number.isRequired
};


export default SmellIndicator;
