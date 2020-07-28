import React from 'react';

import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const modal = (props) => {
  return (
    <Aux>
      <div
        className={classes.Modal}
        style={{ transform: props.open ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.open ? 1 : 0 }}
      >
        {props.children}
      </div>
      <Backdrop show={props.open} closeModal={props.close}></Backdrop>
    </Aux>
  );
};

export default modal;
