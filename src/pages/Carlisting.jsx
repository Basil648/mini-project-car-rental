import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css'; 

function Cars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/basil648/my_fake_api/cars")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Error fetching cars:", err));
  }, []);

  return (
    <Container className="py-5">
      <Row className="g-4">
        {cars.map(car => (
          <Col key={car.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Img
                variant="top"
                src={car.image}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{car.name}</Card.Title>
                <Card.Text className="mb-3">
                  <i className="bi bi-people-fill me-2"></i>{car.seats} Seats <br />
                  <i className="bi bi-fuel-pump-fill me-2"></i>{car.fuel} <br />
                  <i className="bi bi-currency-dollar me-2"></i>{car.rentPerDay}/day
                </Card.Text>
                <Button
                  variant="primary"
                  className="mt-auto mx-auto"
                  style={{ backgroundColor: '#5dade2', borderColor: '#5dade2', width: '60%' }}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Cars;
