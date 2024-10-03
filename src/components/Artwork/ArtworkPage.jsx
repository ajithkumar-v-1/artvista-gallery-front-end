import React, { useState, useEffect } from 'react';
import SearchFilter from './SearchFilter';

const ArtworksPage = () => {
  const [artworks, setArtworks] = useState([]);

  const fetchArtworks = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/artworks?${query}`);
    const data = await response.json();
    setArtworks(data);
  };

  useEffect(() => {
    fetchArtworks(); // Fetch all artworks on initial render
  }, []);

  const handleSearch = (filters) => {
    fetchArtworks(filters);
  };

  return (
    <div>
      <SearchFilter onSearch={handleSearch} />
      <div className="artworks-grid">
        {artworks.map((artwork) => (
          <div key={artwork._id} className="artwork-card">
            <h3>{artwork.title}</h3>
            <p>{artwork.artist}</p>
            <img src={artwork.images[0]} alt={artwork.title} className="artwork-image" />
            {/* Add more artwork details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworksPage;
