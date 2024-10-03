import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtworks, addArtwork, deleteArtwork, updateArtwork } from '../../slices/artworkSlice';
import { selectArtworks, selectArtworksStatus, selectArtworksError } from '../../slices/artworkSelectors';
import { logout } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import logo from '../../../assets/logout.png'; // Path to your logo image

const ArtistDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const artworks = useSelector(selectArtworks);
  const status = useSelector(selectArtworksStatus);
  const error = useSelector(selectArtworksError);
  const { token, username } = useSelector((state) => state.auth || {});

  const [newArtwork, setNewArtwork] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });

  const [selectedArtwork, setSelectedArtwork] = useState(null); // Track the selected artwork for updating
  const [showModal, setShowModal] = useState(false); // Control the visibility of the update modal
  const [showAddForm, setShowAddForm] = useState(false); // Control the visibility of the add artwork form

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || token; // Get token from localStorage or Redux
    if (storedToken) {
      dispatch(fetchArtworks(storedToken));
    }
  }, [dispatch, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArtwork({ ...newArtwork, [name]: value });
  };

  const handleAddArtwork = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('token') || token;
    if (storedToken) {
      dispatch(addArtwork({ newArtwork, token: storedToken }))
        .then(() => {
          toast.success('Artwork added successfully');
          setNewArtwork({ title: '', description: '', price: '', image: '', category: '' });
          setShowAddForm(false); // Hide form after adding artwork
        })
        .catch(() => toast.error('Error adding artwork'));
    }
  };

  const handleDeleteArtwork = (artworkId) => {
    const storedToken = localStorage.getItem('token') || token;
    if (storedToken) {
      dispatch(deleteArtwork({ artworkId, token: storedToken }))
        .then(() => toast.success('Artwork deleted successfully'))
        .catch(() => toast.error('Error deleting artwork'));
    }
  };

  const handleUpdateArtwork = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('token') || token;
    if (storedToken && selectedArtwork) {
      dispatch(updateArtwork({ artworkId: selectedArtwork._id, updatedArtwork: newArtwork, token: storedToken }))
        .then(() => {
          toast.success('Artwork updated successfully');
          setShowModal(false);
          setSelectedArtwork(null);
          setNewArtwork({ title: '', description: '', price: '', image: '', category: '' });
        })
        .catch(() => toast.error('Error updating artwork'));
    }
  };

  const openUpdateModal = (artwork) => {
    setSelectedArtwork(artwork);
    setNewArtwork({
      title: artwork.title,
      description: artwork.description,
      price: artwork.price,
      image: artwork.image,
      category: artwork.category,
    });
    setShowModal(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <Container className="my-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <img src={logo} alt="Logo" style={{ height: '50px' }} />
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <h2>Artist Dashboard</h2>
      <h3>Welcome, {username}</h3>

      {/* Toggle Add Artwork Form */}
      <Button
        variant="primary"
        onClick={() => setShowAddForm(!showAddForm)}
        className="mb-4"
      >
        {showAddForm ? 'Cancel' : 'Add Artwork'}
      </Button>

      {/* Add Artwork Form (conditionally rendered) */}
      {showAddForm && (
        <Form onSubmit={handleAddArtwork} className="my-4">
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newArtwork.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={newArtwork.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={newArtwork.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={newArtwork.image}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={newArtwork.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Painting">Painting</option>
              <option value="Sculpture">Sculpture</option>
              <option value="drawing">Drawing</option>
              <option value="Photography">Photography</option>
              <option value="animation">Animation</option>
  
            </Form.Select>
          </Form.Group>
          <Button type="submit">Add Artwork</Button>
        </Form>
      )}

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {/* Display all artworks */}
      <Row>
        {status === 'succeeded' &&
          artworks.map((artwork) => (
            <Col md={4} key={artwork._id}>
              <Card className="mb-4">
                <Card.Img variant="top" src={artwork.image} alt={artwork.title} />
                <Card.Body>
                  <Card.Title>{artwork.title}</Card.Title>
                  <Card.Text>{artwork.description}</Card.Text>
                  <Card.Text>Rs.{artwork.price}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteArtwork(artwork._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    className="ms-2"
                    onClick={() => openUpdateModal(artwork)}
                  >
                    Update
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      {/* Modal for updating artwork */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Artwork</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateArtwork}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newArtwork.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newArtwork.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newArtwork.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={newArtwork.image}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={newArtwork.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Painting">Painting</option>
                <option value="Sculpture">Sculpture</option>
                <option value="animation">Animation</option>
                <option value="Photography">Photography</option>
                <option value="drawing">Drawing</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit">Update Artwork</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ArtistDashboard;
