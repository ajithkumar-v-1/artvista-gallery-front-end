import React, { useState } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
// import ArtistDashboard from '../ArtistDashboard';
import BannerCarousel from './BannerCarousel';

const App = () => {
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (artwork) => {
    setCart((prevCart) => [...prevCart, artwork]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (artworkId) => {
    // setCart((prevCart) => prevCart.filter(item => item._id !== artworkId));
  };

  return (
    <div>
      <Header cartItems={cart.length} />
      <BannerCarousel />
      <Body addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} />
      <Footer />
    </div>
  );
};

export default App;
