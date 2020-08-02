import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.open !== this.props.open;
  }

  render() {
    return (
      <Aux>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.open ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.open ? 1 : 0
          }}
        >
          {this.props.children}
        </div>
        <Backdrop show={this.props.open} close={this.props.close}></Backdrop>
      </Aux>
    );
  }
}

export default Modal;
