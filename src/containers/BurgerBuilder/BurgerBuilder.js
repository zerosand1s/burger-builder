import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerBuildControls from '../../components/Burger/BurgerBuildControls/BurgerBuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    canOrder: false,
    ordering: false
  };

  toggleCanOrder = (ingredients) => {
    const sum = Object.values(ingredients).reduce((a, b) => a + b, 0);

    this.setState({ canOrder: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENTS_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.toggleCanOrder(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }

    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = updatedCount;

    const priceReduction = INGREDIENTS_PRICES[type];
    const newPrice = this.state.totalPrice - priceReduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.toggleCanOrder(updatedIngredients);
  };

  orderHandler = () => {
    this.setState({ ordering: true });
  };

  orderCancelHandler = () => {
    this.setState({ ordering: false });
  };

  orderContinueHandler = () => {
    alert('Yay!!!');
  };

  render() {
    const disableButtonsInfo = { ...this.state.ingredients };

    for (const key in disableButtonsInfo) {
      disableButtonsInfo[key] = disableButtonsInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal open={this.state.ordering} close={this.orderCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            handleContinueClick={this.orderContinueHandler}
            handleCancelClick={this.orderCancelHandler}
          ></OrderSummary>
        </Modal>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BurgerBuildControls
          price={this.state.totalPrice}
          canOrder={this.state.canOrder}
          disableButtonsInfo={disableButtonsInfo}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          orderHandler={this.orderHandler}
        ></BurgerBuildControls>
      </Aux>
    );
  }
}

export default BurgerBuilder;
