import React from 'react';

import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
  let _classes = [classes.SideDrawer, classes.Close];

  if (props.showSideDrawer) {
    _classes = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.showSideDrawer} close={props.closeSideDrawer}></Backdrop>
      <div className={_classes.join(' ')}>
        <div style={{ height: '10%', marginBottom: '32px' }}>
          <Logo></Logo>
        </div>
        <nav>
          <NavigationItems></NavigationItems>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
