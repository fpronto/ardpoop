import React from 'react';
import PropTypes from 'prop-types';

import './header.css';

const Header = (props) => {
    const { title } = props;
    return (
        <div className='header'>
            <span className='header-title'>{title}</span>
        </div>
    );
};

Header.defaultProps = {
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};


export default Header;
