// src/pages/Assistance.jsx
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Assistance() {
  const [technicians, setTechnicians] = useState([]);
  const [filteredTechs, setFilteredTechs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");

  const commonPhone = "+91 98765 00000"; // universal contact number

  useEffect(() => {
    fetch("/tech.json")
      .then((res) => res.json())
      .then((data) => {
        setTechnicians(data);
        setFilteredTechs(data);

        const uniqueLocations = ["All", ...new Set(data.map((t) => t.location))];
        setLocations(uniqueLocations);
      })
      .catch((err) => console.error("Error loading technicians:", err));
  }, []);

  // handle filter
  const handleFilter = (location) => {
    setSelectedLocation(location);
    if (location === "All") {
      setFilteredTechs(technicians);
    } else {
      setFilteredTechs(technicians.filter((t) => t.location === location));
    }
  };

  // fixed rating per tech (randomized once at load)
  const assignRatings = (list) =>
    list.map((t) => ({
      ...t,
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
    }));

  useEffect(() => {
    if (technicians.length > 0) {
      setFilteredTechs(assignRatings(technicians));
    }
  }, [technicians]);

  return (
    <>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1388278/pexels-photo-1388278.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "360px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
        }}
      >
        <h1>On-Road Assistance</h1>
      </div>

      {/* Filter */}
      <Container className="py-5">
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <strong style={{ fontSize: "1rem" }}>Filter by Location</strong>
        </div>
        <Form.Select
          value={selectedLocation}
          onChange={(e) => handleFilter(e.target.value)}
          style={{
            maxWidth: "300px",
            margin: "0 auto 40px auto",
            borderRadius: "0",
          }}
        >
          {locations.map((loc, idx) => (
            <option key={idx} value={loc}>
              {loc}
            </option>
          ))}
        </Form.Select>

        {/* Technician Cards */}
        <Row className="g-4">
          {filteredTechs.map((tech) => (
            <Col key={tech.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="shadow-sm h-100 text-center border-0"
                style={{
                  borderRadius: "0",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 18px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 5px 10px rgba(0,0,0,0.08)";
                }}
              >
                <Card.Img
                  variant="top"
                  src={tech.image}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    borderBottom: "1px solid #e9ecef",
                  }}
                />
                <Card.Body style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <Card.Title className="fw-bold">{tech.name}</Card.Title>
                  <Card.Text style={{ fontSize: "0.9rem", color: "#555" }}>
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    {tech.location}
                  </Card.Text>

                  {/* Star Rating */}
                  <div className="mb-2">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi bi-star-fill ${
                          i < tech.rating ? "text-warning" : "text-muted"
                        }`}
                      ></i>
                    ))}
                  </div>

                  {/* Rate */}
                  <p style={{ marginBottom: "5px", fontWeight: "500" }}>
                    ₹300/hr
                  </p>

                  {/* Phone number */}
                  <p style={{ marginBottom: "15px", color: "#444" }}>
                    <i className="bi bi-telephone-fill me-2 text-success"></i>
                    {commonPhone}
                  </p>

                  <Button
                    variant="dark"
                    style={{
                      borderRadius: "0",
                      width: "100%",
                      fontWeight: "500",
                    }}
                    href={`tel:${commonPhone}`}
                  >
                    <i className="bi bi-telephone-fill me-2"></i>Call Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
