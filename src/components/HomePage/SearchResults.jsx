import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const artworks = location.state?.artworks || [];

  return (
    <Container>
      <h2 className="my-4">Search Results</h2>
      <Row>
        {artworks.length === 0 ? (
          <p>No artworks found</p>
        ) : (
          artworks.map((artwork) => (
            <Col key={artwork._id} md={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src={artwork.image} />
                <Card.Body>
                  <Card.Title>{artwork.title}</Card.Title>
                  <Card.Text>{artwork.artist.username}</Card.Text>
                  <Card.Text>Rs.{artwork.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default SearchResults;
