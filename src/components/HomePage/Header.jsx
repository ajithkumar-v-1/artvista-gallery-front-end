import React from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import './Header.css'; // Ensure this is correctly imported

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const userRole = localStorage.getItem('role'); // Retrieve role from local storage
  const navigate = useNavigate(); // For redirecting after logout

  const handleLogout = () => {
    // Clear JWT and user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('cart');

    // Redirect to the login page
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/home" className="brand-name">ArtVista</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/cart" className="cart-link">
            <i className="fas fa-shopping-cart"></i>
            {cart.length > 0 && (
              <Badge pill className="cart-badge">{cart.length}</Badge>
            )}
          </Nav.Link>
          {userRole === 'artist' && (
            <Nav.Link as={Link} to="/artist-dashboard">Artist Dashboard</Nav.Link>
          )}
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
