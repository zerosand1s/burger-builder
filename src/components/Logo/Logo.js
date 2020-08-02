import React from 'react';

import classes from './Logo.module.css';

import Logo from '../../assets/images/burger-logo.png';

const logo = () => (
  <div className={classes.Logo}>
    <img src={Logo} alt="Burger Builder" />
  </div>
);

export default logo;
