import { Card, Container, Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLoaderData, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import '../App.css'

function Cars() {
  const cars = useLoaderData(); // 10 API cars
  const [localCars, setLocalCars] = useState([]);

  // Load admin-added cars from localStorage
  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem("localCars")) || [];
    setLocalCars(storedCars);
  }, []);

  return (
    <>
      <Container className="py-5">
        <Row className="g-4">
          {cars.map((car) => (
            <Col key={car.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="shadow-sm border-0 h-100 car-card"
                style={{
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

                 
                  <div
                    style={{
                      backgroundColor: "#25a0a4ff",
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
          ))}
        </Row>
      </Container>

      {/* === NEW ADDITIONS SECTION === */}
      <section className="py-5">
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          NEWEST  ADDITIONS
        </h2>
        <Container>
          {localCars.length === 0 ? (
            <p style={{ textAlign: "center" }}>No new cars added yet.</p>
          ) : (
            <Row className="g-4">
              {localCars.map((car) => (
                <Col key={car.id} xs={12} sm={6} md={4} lg={3}>
                  <Card className="shadow-sm border-0 h-100">
                    <Card.Img
                      variant="top"
                      src={car.images[0]}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-bold">{car.name}</Card.Title>
                      <Card.Text className="mb-3 mt-2">
                        <i className="bi bi-people-fill me-2"></i>
                        {car.seats} Seats <br />
                        <i className="bi bi-fuel-pump-fill me-2"></i>
                        {car.fuel} <br />
                        <i className="bi bi-currency-dollar me-2"></i>
                        {car.rentPerDay}/day <br />
                      </Card.Text>
                      <Link to={`/local-car/${car.id}`} className="btn btn-primary mt-auto">
                        View Details
                      </Link>

                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </>
  );
}

export default Cars;
