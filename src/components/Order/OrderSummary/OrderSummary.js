import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((key) => (
    <li key={key}>
      <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Ingredients in your delicious burger:</p>
      <ul>{ingredients}</ul>
      <p>
        <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button type="Danger" clicked={props.handleCancelClick}>
        CANCEL
      </Button>
      <Button type="Success" clicked={props.handleContinueClick}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
