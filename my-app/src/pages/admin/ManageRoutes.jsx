import React, { useEffect, useState } from "react";
import trainRouteService from "../../services/routeService"; // Import API service
import { Modal, Button, Form, Table, Alert, Spinner } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const ManageRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentRoute, setCurrentRoute] = useState({ trainNumber: "", source: "", destination: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all routes
  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const data = await trainRouteService.getAllRoutes();
      setRoutes(data);
    } catch (error) {
      setError("Error fetching routes");
    } finally {
      setLoading(false);
    }
  };

  // Handle Add / Edit form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "add") {
        await trainRouteService.createRoute(currentRoute);
      } else {
        await trainRouteService.updateRoute(currentRoute.id, currentRoute);
      }
      fetchRoutes();
      setShowModal(false);
    } catch (error) {
      setError("Error saving route.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      await trainRouteService.deleteRoute(id);
      fetchRoutes();
    }
  };

  // Handle Search
  const handleSearch = async () => {
    if (searchTerm) {
      const results = await trainRouteService.searchRoutesByTrainNumber(searchTerm);
      setRoutes(results);
    } else {
      fetchRoutes();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary">Manage Routes</h2>

      {/* Search Box */}
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Train Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch} className="ms-2">
          <FaSearch /> Search
        </Button>
      </div>

      {/* Add Route Button */}
      <Button variant="success" className="mb-3" onClick={() => { setModalType("add"); setCurrentRoute({ trainNumber: "", source: "", destination: "" }); setShowModal(true); }}>
        <FaPlus /> Add Route
      </Button>

      {/* Loading Spinner */}
      {loading && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}

      {/* Error Alert */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Routes Table */}
      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Train Number</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.length > 0 ? (
              routes.map((route) => (
                <tr key={route.id}>
                  <td>{route.id}</td>
                  <td>{route.trainNumber}</td>
                  <td>{route.source}</td>
                  <td>{route.destination}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => { setModalType("edit"); setCurrentRoute(route); setShowModal(true); }}>
                      <FaEdit />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(route.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">No routes available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for Add / Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "add" ? "Add New Route" : "Edit Route"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Train Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter train number"
                value={currentRoute.trainNumber}
                onChange={(e) => setCurrentRoute({ ...currentRoute, trainNumber: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Source</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter source"
                value={currentRoute.source}
                onChange={(e) => setCurrentRoute({ ...currentRoute, source: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter destination"
                value={currentRoute.destination}
                onChange={(e) => setCurrentRoute({ ...currentRoute, destination: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {modalType === "add" ? "Add Route" : "Update Route"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageRoutes;
