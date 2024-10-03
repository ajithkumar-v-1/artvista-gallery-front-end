import React from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'; // Ensure this is correctly imported

const Header = ({ cartItems }) => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/" className="brand-name">ArtVista</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          <Nav.Link as={Link} to="/cart" className="cart-link">
            <i className="fas fa-shopping-cart"></i>
            <Badge pill className="cart-badge">{cartItems}</Badge>
          </Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/artistdashboard">Artist Dashboard</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
