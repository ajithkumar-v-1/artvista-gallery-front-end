import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../slices/cartSlice';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [error, setError] = useState('');

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.address || !formData.city || !formData.state || !formData.zip || !formData.country) {
      setError('Please fill out all fields');
      return;
    }

    // Process the order (e.g., send to backend)
    // For now, just clearing the cart and redirecting
    dispatch(clearCart());
    navigate('/order-confirmation'); // Redirect to order confirmation page or similar
  };

  return (
    <Container className="checkout-page">
      <h2>Checkout</h2>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ul className="order-summary-list">
                {cart.map(item => (
                  <li key={item._id} className="order-summary-item">
                    <img src={item.image} alt={item.title} className="order-item-image" />
                    <strong>{item.title}</strong> - Rs.{item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
              <h4 className="total-price">Total Price: Rs.{totalPrice.toFixed(2)}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Shipping Information</Card.Title>
              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </Form.Group>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                  />
                </Form.Group>
                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                  />
                </Form.Group>
                <Form.Group controlId="formZip">
                  <Form.Label>ZIP Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="Enter your ZIP code"
                  />
                </Form.Group>
                <Form.Group controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter your country"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
