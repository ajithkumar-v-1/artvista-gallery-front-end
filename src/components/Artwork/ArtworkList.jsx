import React from 'react';
import { useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

const ArtworkList = () => {
  const artworks = useSelector((state) => state.artworks.list);
  const dispatch = useDispatch();

  const handleAddToCart = (artwork) => {
    dispatch(addToCart(artwork));
  };

  return (
    <div>
      <h1>Artwork List</h1>
      {artworks.map((artwork) => (
        <div key={artwork._id}>
          <h2>{artwork.title}</h2>
          <p>{artwork.description}</p>
          <button onClick={() => handleAddToCart(artwork)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ArtworkList;
