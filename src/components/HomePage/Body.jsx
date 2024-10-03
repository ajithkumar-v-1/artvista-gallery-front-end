import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { fetchRatings, updateRating } from '../slices/ratingSlice';
import { API } from '../API';
import axios from 'axios';
import Rating from 'react-rating';
import './Body.css';

const Body = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [offers, setOffers] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const ratings = useSelector((state) => state.ratings);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(`${API}/artwork`);
        const fetchedArtworks = response.data;
        setArtworks(fetchedArtworks);

        // Generate and store offers once when artworks are fetched
        const initialOffers = {};
        fetchedArtworks.forEach((artwork) => {
          initialOffers[artwork._id] = getRandomOffer();
        });
        setOffers(initialOffers);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    const fetchRatingsData = async () => {
      dispatch(fetchRatings());
    };

    fetchArtworks();
    fetchRatingsData();
  }, [dispatch]);

  const handleAddToCart = (artwork) => {
    dispatch(addToCart(artwork));
    // No need to update offers here
  };

  const handleRemoveFromCart = (artworkId) => {
    dispatch(removeFromCart(artworkId));
  };

  const isInCart = (artworkId) => {
    return cart.some((item) => item._id === artworkId);
  };

  const handleRatingChange = (rating, artworkId) => {
    dispatch(updateRating({ artworkId, rating }));
  };

  const getAverageRating = (artworkId) => {
    if (!ratings) return 'N/A';
    const artwork = ratings.find((artwork) => artwork._id === artworkId);
    return artwork && artwork.rating ? artwork.rating.toFixed(1) : 'N/A';
  };

  const getRandomOffer = () => {
    const offers = [5, 10, 15, 20, 25]; // Possible discount percentages
    return offers[Math.floor(Math.random() * offers.length)];
  };

  const filteredArtworks = artworks.filter((artwork) =>
    selectedCategory ? artwork.category.toLowerCase() === selectedCategory.toLowerCase() : true
  );

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Welcome to ArtShop</h2>
      <Form className="mb-4">
        <Form.Group controlId="categorySelect" className="filter-form-group">
          <Form.Label className="filter-form-label">Filter by Category</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-form-control"
          >
            <option value="">All</option>
            <option value="Painting">Painting</option>
            <option value="animation">Animation</option>
            <option value="drawing">Drawing</option>
            <option value="Photography">Photography</option>
            <option value="sculpture">Sculpture</option>
          </Form.Control>
        </Form.Group>
      </Form>

      <Row>
        {filteredArtworks.map((artwork) => (
          <Col xs={12} sm={6} md={4} lg={3} key={artwork._id} className="d-flex align-items-stretch">
            <Card className="mb-4 custom-card">
              <Card.Img variant="top" src={artwork.image} alt={artwork.title} className="custom-card-img" />
              <Card.Body>
                <Card.Title className="custom-card-title">{artwork.title}</Card.Title>
                <Card.Text className="custom-card-artist">by {artwork.artist.username}</Card.Text>
                <Card.Text className="custom-card-description">{artwork.description}</Card.Text>
                <Card.Text className="custom-card-price">
                  <span className="price">Rs. {artwork.price}</span>
                  <span className="offer-text">{offers[artwork._id] || 'No offer' }% OFF</span>
                </Card.Text>
                <Card.Text className="custom-card-rating">Rating: {getAverageRating(artwork._id)}</Card.Text>
                <Rating
                  emptySymbol={<i className="fa fa-star transparent-star" />}
                  fullSymbol={<i className="fa fa-star yellow-star" />}
                  initialRating={artwork.rating}
                  onChange={(rating) => handleRatingChange(rating, artwork._id)}
                />
                <div className="mt-3">
                  {isInCart(artwork._id) ? (
                    <Button variant="danger" onClick={() => handleRemoveFromCart(artwork._id)}>
                      <i className="fa fa-shopping-cart"></i> Remove from Cart
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={() => handleAddToCart(artwork)}>
                      <i className="fa fa-shopping-cart"></i> Add to Cart
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Body;
