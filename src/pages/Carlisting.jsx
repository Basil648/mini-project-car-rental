import { Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useLoaderData, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

function Cars() {
  const cars = useLoaderData(); // API cars
  const [localCars, setLocalCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // ✅ Get logged-in username from localStorage
  const userId = localStorage.getItem("username");
  const wishlistKey = `wishlist_${userId}`;

  // Load admin-added cars from localStorage
  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem("localCars")) || [];
    setLocalCars(storedCars);
  }, []);

  // Load wishlist from localStorage
  useEffect(() => {
    if (!userId) return; // no user logged in
    const storedWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    setWishlist(storedWishlist);
  }, [wishlistKey, userId]);

  // Add/remove car from wishlist
  const toggleWishlist = (carId) => {
    let updated;
    if (wishlist.includes(carId)) {
      updated = wishlist.filter((id) => id !== carId); // remove
    } else {
      updated = [...wishlist, carId]; // add
    }
    setWishlist(updated);
    localStorage.setItem(wishlistKey, JSON.stringify(updated));
  };

  // Check if a car is in wishlist
  const isWishlisted = (carId) => wishlist.includes(carId);

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
                <div style={{ position: "relative" }}>
                  <Card.Img
                    variant="top"
                    src={car.images[1]}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  {/* ❤️ Wishlist button */}
                  {userId && (
                    <button
                      onClick={() => toggleWishlist(car.id)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "35px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      }}
                    >
                      <i
                        className={`bi ${isWishlisted(car.id) ? "bi-heart-fill" : "bi-heart"
                          }`}
                        style={{
                          fontSize: "18px",
                          color: isWishlisted(car.id) ? "red" : "black",
                        }}
                      ></i>
                    </button>
                  )}
                </div>

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

                  <Link
                    to={`/cars/${car.id}`}
                    className="btn btn-primary mt-auto"
                  >
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
          NEWEST ADDITIONS
        </h2>
        <Container>
          {localCars.length === 0 ? (
            <p style={{ textAlign: "center" }}>No new cars added yet.</p>
          ) : (
            <Row className="g-4">
              {localCars.map((car) => (
                <Col key={car.id} xs={12} sm={6} md={4} lg={3}>
                  <Card className="shadow-sm border-0 h-100">
                    <div style={{ position: "relative" }}>
                      <Card.Img
                        variant="top"
                        src={car.images[0]}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                      {/* ❤️ Wishlist button */}
                      {userId && (
                        <button
                          onClick={() => toggleWishlist(car.id)}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "35px",
                            height: "35px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          }}
                        >
                          <i
                            className={`bi ${isWishlisted(car.id)
                                ? "bi-heart-fill"
                                : "bi-heart"
                              }`}
                            style={{
                              fontSize: "18px",
                              color: isWishlisted(car.id) ? "red" : "black",
                            }}
                          ></i>
                        </button>
                      )}
                    </div>

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
                      <Link
                        to={`/local-car/${car.id}`}
                        className="btn btn-primary mt-auto"
                      >
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
