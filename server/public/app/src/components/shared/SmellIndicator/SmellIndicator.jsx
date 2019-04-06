import React from 'react';
import PropTypes from 'prop-types';
import poop from '../../../assets/poop_toxicity.svg';

import './smellindicator.css';

const SmellIndicator = (props) => {
    const { smellValue } = props;
    // console.log(typeof smellValue);
    let valueClass = 'smell-indicator-value';

    if (smellValue < 30) {
        valueClass += ' green';
    }
    else if (smellValue < 60) {
        valueClass += ' yellow';
    }
    else if (smellValue < 100) {
        valueClass += ' orange';
    }
    else {
        valueClass += ' red';
    }

    return (
        <div className='smell-indicator'>
            <div className='smell-indicator-icon'>
                <img src={poop} alt='toxicity'></img>
            </div>
            <div className="smell-indicator-text">
                <span className='smell-indicator-label'>Toxicity:</span>
                <span className={valueClass}>{smellValue}</span>
            </div>
        </div>
    );
};

SmellIndicator.defaultProps = {
};

SmellIndicator.propTypes = {
    smellValue: PropTypes.number.isRequired
};


export default SmellIndicator;
