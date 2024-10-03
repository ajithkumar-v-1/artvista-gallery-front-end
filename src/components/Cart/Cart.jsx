import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Container } from 'react-bootstrap';
import { removeFromCart, updateQuantity } from '../slices/cartSlice';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ _id: id, quantity }));
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const handleCheckout = () => {
    // Navigate to the checkout page
    navigate('/checkout');
  };

  return (
    <Container className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items-container">
        {cart.map(item => (
          <div className="cart-item" key={item._id}>
            <Card className="cart-item-card">
              <Card.Img variant="top" src={item.image} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>Price: Rs.{item.price}</Card.Text>
                <Card.Text>
                  Quantity: 
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="quantity">{item.quantity}</span>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </Card.Text>
                <Button variant="danger" onClick={() => handleRemoveFromCart(item._id)}>
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="cart-footer">
            <h4>Total Price: Rs.{totalPrice.toFixed(2)}</h4>
            <Button variant="primary" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
          <div>
          <Button variant="primary" onClick={() => navigate('/home')}>
  Continue Shopping
</Button>
          </div>


    </Container>
  );
};

export default CartPage;
