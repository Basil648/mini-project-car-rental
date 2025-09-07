import { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


function Wishlist() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [wishlistCars, setWishlistCars] = useState([]);
  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    if (currentUser) {
      // ✅ Step 1: Get wishlist IDs for this user
      const savedIds =
        JSON.parse(localStorage.getItem(`wishlist_${currentUser}`)) || [];
      setWishlistIds(savedIds);

      // ✅ Step 2: Fetch API cars + localCars
      async function fetchCars() {
        const res = await fetch(
          "https://my-json-server.typicode.com/basil648/my_fake_api/cars"
        );
        const apiCars = await res.json();
        const localCars = JSON.parse(localStorage.getItem("localCars")) || [];

        // ✅ Step 3: Merge and filter
        const allCars = [...apiCars, ...localCars];
        const matched = allCars.filter((car) => savedIds.includes(car.id));
        setWishlistCars(matched);
      }

      fetchCars();
    }
  }, [currentUser]);

  // ✅ Remove car from wishlist
  const removeFromWishlist = (id) => {
    const updatedIds = wishlistIds.filter((carId) => carId !== id);
    setWishlistIds(updatedIds);
    setWishlistCars(wishlistCars.filter((car) => car.id !== id));

    localStorage.setItem(
      `wishlist_${currentUser}`,
      JSON.stringify(updatedIds)
    );
  };

  if (!currentUser) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Please login to view your wishlist.
      </p>
    );
  }

  return (
    <div style={{ padding: "15px" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "15px",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1.5rem",
        }}
      >
        {currentUser}'s Wishlist
      </h2>

      {wishlistCars.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your wishlist is empty.</p>
      ) : (
        <Row className="g-3">
          {wishlistCars.map((car) => (
            <Col xs={12} sm={6} md={3} key={car.id}>
              <Card
                className="shadow-sm border-0 h-100"
                style={{
                  borderRadius: "0",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  backgroundColor: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 3px 6px rgba(0,0,0,0.05)";
                }}
              >
                {/* Car Image */}
                <Card.Img
                  variant="top"
                  src={car.images ? car.images[0] : car.image}
                  style={{
                    height: "140px", // smaller image
                    objectFit: "cover",
                    borderBottom: "1px solid #e9ecef",
                  }}
                />

                {/* Card Body */}
                <Card.Body
                  className="d-flex flex-column"
                  style={{ padding: "12px", fontFamily: "'Poppins', sans-serif" }}
                >
                  {/* Title */}
                  <Card.Title
                    className="fw-bold mb-1"
                    style={{ fontSize: "1rem", color: "#1a1a1a" }}
                  >
                    {car.name}
                  </Card.Title>

                  {/* Car Info */}
                  <div
                    className="d-flex justify-content-between align-items-center mb-2"
                    style={{ fontSize: "0.8rem", color: "#495057" }}
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

                  {/* Buttons Side by Side */}
                  <div className="d-flex gap-2 mt-auto">
                    <button
                      onClick={() => removeFromWishlist(car.id)}
                      style={{
                        flex: 1,
                        backgroundColor: "#ff4d4f",
                        color: "#ffffff",
                        padding: "8px",
                        border: "none",
                        textAlign: "center",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        borderRadius: "0",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#d9363e")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#ff4d4f")
                      }
                    >
                      Remove
                    </button>

                    <button
                      style={{
                        flex: 1,
                        backgroundColor: "#1a1a1a",
                        color: "#ffffff",
                        padding: "8px",
                        border: "none",
                        textAlign: "center",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        borderRadius: "0",
                        transition: "background-color 0.2s ease",
                       
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#343a40")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#1a1a1a")
                      }
                    >
                     <Link to={`/cars/${car.id}`} style={{ textDecoration:"none", color:"white"}}> View Details</Link>
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Wishlist;
