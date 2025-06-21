import React, { useEffect, useState } from "react";
import { getAllTrains, createTrain, updateTrain, deleteTrain } from "../../services/trainService";
import { FaEdit, FaTrash, FaTrain, FaPlus, FaSearch } from "react-icons/fa";
import { Button, Table, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";

const locations = ["New Delhi", "Mumbai", "Chennai", "Kolkata", "Bangalore","Hyderabad","Srikakulam","Anantapur","Shirdhi"];

const ManageTrains = () => {
  const [trains, setTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTrain, setEditingTrain] = useState(null);
  const [trainData, setTrainData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all trains when the component loads
  useEffect(() => {
    async function fetchTrains() {
      try {
        const data = await getAllTrains();
        if (!data || data.length === 0) throw new Error("No train data available");
        setTrains(data);
        setFilteredTrains(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTrains();
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = trains.filter(
      (train) =>
        train.name.toLowerCase().includes(query) ||
        train.source.toLowerCase().includes(query) ||
        train.destination.toLowerCase().includes(query) ||
        train.trainNumber.toString().includes(query)
    );
    setFilteredTrains(filtered);
  };

  // Open Modal for Adding or Editing Train
  const handleShowModal = (train = null) => {
    setEditingTrain(train);
    setTrainData(
      train
        ? { ...train } // If editing, set train data
        : {
            trainNumber: "",
            name: "",
            source: "",
            destination: "",
            departureTime: "",
            arrivalTime: "",
            trainType: "",
            capacity: "",
            availableSeats: "",
            fare: "",
            departureDate: "",
          }
    );
    setShowModal(true);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setTrainData({ ...trainData, [e.target.name]: e.target.value });
  };

  // Handle Add or Update Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTrain) {
      const success = await updateTrain(editingTrain.trainNumber, trainData);
      if (success) {
        setTrains(trains.map((t) => (t.trainNumber === editingTrain.trainNumber ? trainData : t)));
        setFilteredTrains(filteredTrains.map((t) => (t.trainNumber === editingTrain.trainNumber ? trainData : t)));
      }
    } else {
      const newTrain = await createTrain(trainData);
      if (newTrain) {
        setTrains([...trains, newTrain]);
        setFilteredTrains([...filteredTrains, newTrain]);
      }
    }
    setShowModal(false);
  };

  // Handle Train Deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this train?")) {
      const success = await deleteTrain(id);
      if (success) {
        setTrains(trains.filter((train) => train.trainNumber !== id));
        setFilteredTrains(filteredTrains.filter((train) => train.trainNumber !== id));
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">
          <FaTrain className="me-2" /> Manage Trains
        </h2>
        <Button variant="success" onClick={() => handleShowModal()}>
          <FaPlus /> Add Train
        </Button>
      </div>

      {/* Search Bar */}
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by Train Name, Number, Source, or Destination..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </InputGroup>

      {/* Show Loading Message */}
      {loading && <p className="text-center text-warning">Loading trains...</p>}

      {/* Show Error Message if Fetch Fails */}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* Display Trains Table */}
      {!loading && !error && filteredTrains.length > 0 ? (
        <div className="table-responsive">
          <Table striped bordered hover className="table-sm text-center">
            <thead className="table-primary">
              <tr>
                <th>Train Number</th>
                <th>Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Train Type</th>
                <th>Capacity</th>
                <th>Available Seats</th>
                <th>Fare</th>
                <th>Departure Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrains.map((train) => (
                <tr key={train.trainNumber}>
                  <td>{train.trainNumber}</td>
                  <td>{train.name}</td>
                  <td>{train.source}</td>
                  <td>{train.destination}</td>
                  <td>{train.departureTime}</td>
                  <td>{train.arrivalTime}</td>
                  <td>{train.trainType}</td>
                  <td>{train.capacity}</td>
                  <td>{train.availableSeats}</td>
                  <td>{train.fare}</td>
                  <td>{train.departureDate}</td>
                  <td className="d-flex gap-2">
                    <Button variant="warning" size="sm" onClick={() => handleShowModal(train)}>
                      <FaEdit />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(train.trainNumber)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        !loading && <p className="text-center text-secondary">No trains available.</p>
      )}

      {/* Add/Edit Train Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTrain ? "Edit Train" : "Add Train"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              {Object.keys(trainData).map((field) => (
                <Col md={6} key={field}>
                  <Form.Group className="mb-3">
                    <Form.Label>{field.replace(/([A-Z])/g, " $1").trim()}</Form.Label>
                    {field === "source" || field === "destination" ? (
                      <Form.Select
                        name={field}
                        value={trainData[field] || ""}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select {field.charAt(0).toUpperCase() + field.slice(1)}</option>
                        {locations.map((location, index) => (
                          <option key={index} value={location}>
                            {location}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      <Form.Control
                        type={field.includes("Time") ? "time" : field.includes("Date") ? "date" : "text"}
                        name={field}
                        value={trainData[field] || ""}
                        onChange={handleChange}
                        required
                        disabled={field === "trainNumber" && !!editingTrain}
                      />
                    )}
                  </Form.Group>
                </Col>
              ))}
            </Row>
            <Button variant="primary" type="submit">
              {editingTrain ? "Update" : "Add"} Train
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageTrains;
