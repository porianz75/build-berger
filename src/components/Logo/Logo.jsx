import React from 'react';
import burgerLogo from '../../assets/images/berger-logo.png';
import classes from './Logo.module.css';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="burgerLogo" />
    </div>
);

export default Logo;