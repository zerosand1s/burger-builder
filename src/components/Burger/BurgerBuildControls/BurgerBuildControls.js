import React from 'react';

import BurgerBuildControl from './BurgerBuildControl/BurgerBuildControl';

import classes from './BurgerBuildControls.module.css';

const controls = [
  { type: 'meat', label: 'Meat' },
  { type: 'salad', label: 'Salad' },
  { type: 'cheese', label: 'Cheese' },
  { type: 'bacon', label: 'Bacon' }
];

const burgerBuildControls = (props) => {
  return (
    <div className={classes.BurgerBuildControls}>
      <p>
        Current price: <strong>${props.price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => (
        <BurgerBuildControl
          key={control.label}
          label={control.label}
          disabled={props.disableButtonsInfo[control.type]}
          addIngredient={() => props.addIngredient(control.type)}
          removeIngredient={() => props.removeIngredient(control.type)}
        ></BurgerBuildControl>
      ))}
      <button className={classes.OrderButton} disabled={!props.canOrder}>
        ORDER NOW
      </button>
    </div>
  );
};

export default burgerBuildControls;
