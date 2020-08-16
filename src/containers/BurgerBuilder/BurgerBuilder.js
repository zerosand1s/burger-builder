import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerBuildControls from '../../components/Burger/BurgerBuildControls/BurgerBuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import ordersAxiosInstance from '../../axios-orders';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    canOrder: false,
    ordering: false,
    loading: false,
    error: false
  };

  componentDidMount = async () => {
    try {
      const res = await ordersAxiosInstance.get('https://burger-builder-1f206.firebaseio.com/ingredients.json');
      this.setState({ ingredients: res.data });
    } catch (err) {
      this.setState({ error: true });
    }
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

  orderContinueHandler = async () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Harsh',
        address: {
          street: 'Test street',
          zipCode: 123456,
          country: 'India'
        },
        email: 'test@gmail.com'
      },
      deliveryMethod: 'fastest'
    };

    try {
      this.setState({ loading: true });
      await ordersAxiosInstance.post('/orders.json', order);
      this.setState({ loading: false, ordering: false });
    } catch (err) {
      this.setState({ loading: false, ordering: false });
    }
  };

  render() {
    const disableButtonsInfo = { ...this.state.ingredients };

    for (const key in disableButtonsInfo) {
      disableButtonsInfo[key] = disableButtonsInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal open={this.state.ordering} close={this.orderCancelHandler}>
          {this.state.loading || !this.state.ingredients ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              handleContinueClick={this.orderContinueHandler}
              handleCancelClick={this.orderCancelHandler}
            ></OrderSummary>
          )}
        </Modal>
        {this.state.error ? (
          <p>Oops! Something went wrong. Please try again later.</p>
        ) : !this.state.ingredients ? (
          <Spinner />
        ) : (
          <Aux>
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
        )}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, ordersAxiosInstance);
