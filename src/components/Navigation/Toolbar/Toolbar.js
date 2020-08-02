import React from 'react';

import Logo from '../../Logo/Logo';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import classes from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle toggleSideDrawer={props.toggleSideDrawer}></DrawerToggle>
    <div style={{ height: '80%' }}>
      <Logo></Logo>
    </div>
    <div className={classes.DesktopOnly}>
      <nav>
        <NavigationItems></NavigationItems>
      </nav>
    </div>
  </header>
);

export default toolbar;
