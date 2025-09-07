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
                className="shadow-sm border-0 h-100"
                style={{
                  borderRadius: '0',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  backgroundColor: '#ffffff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
                }}
              >
                <Card.Img
                  variant="top"
                  src={car.images[1]}
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    borderBottom: '1px solid #e9ecef',
                  }}
                />
                <Card.Body
                  className="d-flex flex-column"
                  style={{ padding: '20px', fontFamily: "'Poppins', sans-serif" }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title
                      className="fw-bold mb-0"
                      style={{ fontSize: '1.25rem', color: '#1a1a1a' }}
                    >
                      {car.name}
                    </Card.Title>
                    {userId && (
                      <button
                        onClick={() => toggleWishlist(car.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '5px',
                        }}
                      >
                        <i
                          className={`bi ${isWishlisted(car.id) ? 'bi-heart-fill' : 'bi-heart'}`}
                          style={{
                            fontSize: '1.2rem',
                            color: isWishlisted(car.id) ? '#ff4d4f' : '#6c757d',
                          }}
                        ></i>
                      </button>
                    )}
                  </div>
                  <div
                    style={{
                      backgroundColor: '#3ba7dcff',
                      display: 'inline-block',
                      padding: '2px 5px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: 'black',
                      marginBottom: '12px',
                      width:"100px"
                    }}
                  >
                    {car.badge}
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center mb-3"
                    style={{ fontSize: '0.9rem', color: '#495057' }}
                  >
                    <span>
                      <i className="bi bi-people-fill me-1"></i>
                      {car.seats} Seats
                    </span>
                    <span>
                      <i className="bi bi-fuel-pump-fill me-1"></i>
                      {car.fuel}
                    </span>
                    <span>
                      <i className="bi bi-currency-dollar me-1"></i>
                      {car.rentPerDay}/day
                    </span>
                  </div>
                  <Link
                    to={`/cars/${car.id}`}
                    style={{
                      backgroundColor: '#1a1a1a',
                      color: '#ffffff',
                      padding: '12px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      borderRadius: '0',
                      display: 'block',
                      marginTop: 'auto',
                      transition: 'background-color 0.2s ease',
                      borderTop: '1px solid #e9ecef',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#343a40')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#1a1a1a')}
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
        <Container className="py-5">
      {localCars.length === 0 ? (
        <p style={{ textAlign: "center" }}>No new cars added yet.</p>
      ) : (
        <Row className="g-4">
          {localCars.map((car) => (
            <Col key={car.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="shadow-sm border-0 h-100"
                style={{
                  borderRadius: "0",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  backgroundColor: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
                }}
              >
                {/* Car Image */}
                <Card.Img
                  variant="top"
                  src={car.images[0]}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderBottom: "1px solid #e9ecef",
                  }}
                />

                {/* Card Body */}
                <Card.Body
                  className="d-flex flex-column"
                  style={{ padding: "20px", fontFamily: "'Poppins', sans-serif" }}
                >
                  {/* Title + Wishlist */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title
                      className="fw-bold mb-0"
                      style={{ fontSize: "1.25rem", color: "#1a1a1a" }}
                    >
                      {car.name}
                    </Card.Title>

                    {userId && (
                      <button
                        onClick={() => toggleWishlist(car.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "5px",
                        }}
                      >
                        <i
                          className={`bi ${
                            isWishlisted(car.id) ? "bi-heart-fill" : "bi-heart"
                          }`}
                          style={{
                            fontSize: "1.2rem",
                            color: isWishlisted(car.id) ? "#ff4d4f" : "#6c757d",
                          }}
                        ></i>
                      </button>
                    )}
                  </div>

                  {/* Badge (if exists) */}
                  {car.badge && (
                    <div
                      style={{
                        backgroundColor: "#3ba7dcff",
                        display: "inline-block",
                        padding: "2px 5px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        color: "black",
                        marginBottom: "12px",
                        width: "100px",
                      }}
                    >
                      {car.badge}
                    </div>
                  )}

                  {/* Car Info */}
                  <div
                    className="d-flex justify-content-between align-items-center mb-3"
                    style={{ fontSize: "0.9rem", color: "#495057" }}
                  >
                    <span>
                      <i className="bi bi-people-fill me-1"></i>
                      {car.seats} Seats
                    </span>
                    <span>
                      <i className="bi bi-fuel-pump-fill me-1"></i>
                      {car.fuel}
                    </span>
                    <span>
                      <i className="bi bi-currency-dollar me-1"></i>
                      {car.rentPerDay}/day
                    </span>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/local-car/${car.id}`}
                    style={{
                      backgroundColor: "#1a1a1a",
                      color: "#ffffff",
                      padding: "12px",
                      textAlign: "center",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      borderRadius: "0",
                      display: "block",
                      marginTop: "auto",
                      transition: "background-color 0.2s ease",
                      borderTop: "1px solid #e9ecef",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#343a40")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#1a1a1a")
                    }
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
