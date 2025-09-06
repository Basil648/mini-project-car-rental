import { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

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
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {currentUser}'s Wishlist
      </h2>

      {wishlistCars.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your wishlist is empty.</p>
      ) : (
        <Row>
          {wishlistCars.map((car) => (
            <Col md={4} key={car.id} style={{ marginBottom: "20px" }}>
              <Card>
                <Card.Img
                  variant="top"
                  src={car.images ? car.images[0] : car.image}
                />
                <Card.Body>
                  <Card.Title>{car.name}</Card.Title>
                  <Card.Text>
                    Seats: {car.seats} <br />
                    Fuel: {car.fuel} <br />
                    Rent/Day: ₹{car.rentPerDay}
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => removeFromWishlist(car.id)}
                  >
                     Remove
                  </Button>
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
