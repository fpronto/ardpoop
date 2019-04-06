import React from 'react';
import logo from '../../../assets/logo.svg';

import './header.css';

const Header = function (props) {
    return (
        <div className='header'>
            <img src={logo} alt='logo'></img>
            {/* <span className='header-title'>{title}</span> */}
        </div>
    );
};

export default Header;
