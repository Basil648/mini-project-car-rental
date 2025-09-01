import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import '../App.css'

function Cars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/basil648/my_fake_api/cars")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Error fetching cars:", err));
  }, []);


  if (!cars) {
    return (
      <div className="loading-track">
        <img
          src="https://imgs.search.brave.com/yFZVuR9TbZ9iF1zAWK4a6OC7Ft0cKp7435GOM8toeiE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3ZncmVwby5jb20v/c2hvdy81MDAwODEv/Y2FyLnN2Zw"   // your side-profile car SVG
          alt="loading car"
          className="loading-car"
        />
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="g-4">
        {cars.map((car) => {
          // Define base colors for badges
          const badgeColor =
            car.badge === "Top Rated"
              ? "#f28b82" // coral red
              : car.badge === "Most Popular"
                ? "#aecbfa" // soft blue
                : car.badge === "Best Selling"
                  ? "#81c995" // green
                  : car.badge === "Affordable"
                    ? "#fff475" // yellow
                    : "#d3d3d3"; // gray fallback

          const cardColor =
            car.badge === "Top Rated"
              ? "#fdecea"
              : car.badge === "Most Popular"
                ? "#eaf3ff"
                : car.badge === "Best Selling"
                  ? "#e6f7ed"
                  : car.badge === "Affordable"
                    ? "#fffdee"
                    : "#f5f5f5";

          return (
            <Col key={car.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="shadow-sm border-0 h-100 car-card"
                style={{
                  backgroundColor: cardColor,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <Card.Img
                  variant="top"
                  src={car.images[1]}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{car.name}</Card.Title>

                  {/* Badge */}
                  <div
                    style={{
                      backgroundColor: badgeColor,
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "500",
                      marginTop: "4px",
                      width: "95px",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    {car.badge}
                  </div>

                  <Card.Text className="mb-3 mt-2">
                    <i className="bi bi-people-fill me-2"></i>
                    {car.seats} Seats <br />
                    <i className="bi bi-fuel-pump-fill me-2"></i>
                    {car.fuel} <br />
                    <i className="bi bi-currency-dollar me-2"></i>
                    {car.rentPerDay}/day
                  </Card.Text>

                  <Link to={`/cars/${car.id}`} className="btn btn-primary mt-auto">
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Cars;
