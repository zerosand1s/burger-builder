import React from 'react';

import classes from './BurgerBuildControl.module.css';

const burgerBuildControl = (props) => {
  return (
    <div className={classes.BurgerBuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Remove} disabled={props.disabled} onClick={props.removeIngredient}>
        Remove
      </button>
      <button className={classes.Add} onClick={props.addIngredient}>
        Add
      </button>
    </div>
  );
};

export default burgerBuildControl;
