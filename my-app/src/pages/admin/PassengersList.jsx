import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaVenusMars,
  FaCalendarAlt,
  FaUsers,
  FaSearch
} from "react-icons/fa";
import {
  Table,
  Spinner,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Badge
} from "react-bootstrap";
import { getAllPassengers } from "../../services/passengerService";

const ManagePassengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [filteredPassengers, setFilteredPassengers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch passengers
  useEffect(() => {
    async function fetchPassengers() {
      try {
        const data = await getAllPassengers();
        if (!data || data.length === 0) throw new Error("No passenger data available");
        setPassengers(data);
        setFilteredPassengers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPassengers();
  }, []);

  // Filter logic
  useEffect(() => {
    const filtered = passengers.filter((p) =>
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPassengers(filtered);
  }, [searchTerm, passengers]);

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h3 className="text-primary d-flex align-items-center">
            <FaUsers className="me-2" /> Passenger Management
          </h3>
          <hr />
        </Col>
      </Row>

      {/* Search Field */}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <InputGroup>
            <InputGroup.Text className="bg-primary text-white">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by passenger name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {/* Loader/Error */}
      {loading && (
        <div className="text-center text-primary">
          <Spinner animation="border" variant="primary" size="sm" className="me-2" />
          Loading passengers...
        </div>
      )}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* Table */}
      {!loading && !error && filteredPassengers.length > 0 ? (
        <div className="table-responsive">
          <Table hover bordered className="text-center shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>#ID</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {filteredPassengers.map((passenger) => (
                <tr key={passenger.id}>
                  <td><strong>{passenger.id}</strong></td>
                  <td><FaUser className="me-2 text-secondary" /> {passenger.fullName}</td>
                  <td>
                    <FaVenusMars className="me-1 text-info" />
                    {passenger.gender}
                  </td>
                  <td>
                    <FaCalendarAlt className="me-1 text-warning" />
                    {passenger.age} yrs
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        !loading && (
          <p className="text-center text-muted">No matching passengers found.</p>
        )
      )}
    </Container>
  );
};

export default ManagePassengers;
