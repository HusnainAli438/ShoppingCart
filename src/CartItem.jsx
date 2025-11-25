import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + (item.cost * item.quantity);
    }, 0).toFixed(2);
  };

  const handleContinueShopping = () => {
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, type: 'increase' }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ name: item.name, type: 'decrease' }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);
  };

  return cart.length === 0 ? (
    <div className="cart-container">
      <div className="cart-summary">
        <h2 style={{ color: 'black' }}>Your Cart is Empty</h2>
        <div className="cart-actions">
          <button className="continue-shopping" onClick={handleContinueShopping}>Continue Shopping</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="cart-container">
      <div className="cart-summary">
        <h2 style={{ color: 'black' }}>Shopping Cart</h2>
        <div className="cart-items-count">Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}</div>
        <h3 style={{ color: 'black' }}>Total Amount: ${calculateTotalAmount()}</h3>
        
        <div className="cart-items">
          {cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">${item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="remove-button" onClick={() => handleRemove(item)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-actions">
          <button className="continue-shopping" onClick={handleContinueShopping}>Continue Shopping</button>
          <button className="checkout-button" onClick={() => alert('Coming Soon!')}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;


