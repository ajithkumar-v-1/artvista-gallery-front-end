import React from 'react';
import { Container } from 'react-bootstrap';

const OrderConfirmationPage = () => {
  return (
    <Container className="order-confirmation-page">
      <h2>Order Confirmation</h2>
      <p>Thank you for your order! We are processing it and will notify you once it's shipped.</p>
    </Container>
  );
};

export default OrderConfirmationPage;
