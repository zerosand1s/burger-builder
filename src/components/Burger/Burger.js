import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.module.css';

const burger = (props) => {
  let ingredients = Object.keys(props.ingredients)
    .map((key) =>
      [...Array(props.ingredients[key])].map((_, i) => <BurgerIngredient key={key + i} type={key}></BurgerIngredient>)
    )
    .reduce((a, b) => a.concat(b), []);

  if (!ingredients.length) {
    ingredients = <p>Start adding ingredients to your burger now!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {ingredients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

export default burger;
