import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../App.css';
import { Badge } from "react-bootstrap";
import { FaUserFriends, FaBolt, FaCog, FaStar } from "react-icons/fa";

function LocalCarDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedCars = JSON.parse(localStorage.getItem("localCars")) || [];
        const foundCar = storedCars.find(c => String(c.id) === id);
        setCar(foundCar);
    }, [id]);

    if (!car) {
        return (
            <div className="loading-track text-center p-5">
                <img
                    src="https://www.svgrepo.com/show/500081/car.svg"
                    alt="loading car"
                    className="loading-car"
                    style={{ width: "100px", opacity: 0.6 }}
                />
                <p className="mt-3">Fetching car details...</p>
            </div>
        );
    }

    // ✅ Login check (using your AdminPanel logic → isLoggedIn flag)
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const handleBooking = () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            navigate(`/booking/${car.id}`);
        }
    };

    return (
        <div className={darkMode ? "bg-dark text-light min-vh-100 p-4" : "bg-light text-dark min-vh-100 p-4"}>
            {/* Dark mode toggle */}
            <div className="text-end mb-3">
                <button
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>

            <div className="container">
                <div className="row align-items-center g-4">

                    {/* Image column - left */}
                    <div className="col-md-6">
                        <img
                            className="d-block w-100 rounded shadow"
                            src={car.images && car.images.length > 0 ? car.images[0] : "https://www.svgrepo.com/show/500081/car.svg"}
                            alt={car.name}
                            style={{ maxHeight: "420px", objectFit: "cover" }}
                        />
                    </div>

                    {/* Details column - right */}
                    <div className="col-md-6">
                        {/* Car title */}
                        <div className="d-flex align-items-center mb-2">
                            <h1 className="fw-bold me-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                                {car.name}
                            </h1>
                            <Badge bg="info" className="ms-2">Hot Deal</Badge>
                            {car.fuel.toLowerCase() === "electric" && (
                                <Badge bg="success" className="ms-2">Electric</Badge>
                            )}
                        </div>

                        {/* Quick specs */}
                        <p className="mb-1">
                            <FaUserFriends className="me-2 text-primary" /> Seats: {car.seats}
                        </p>
                        <p className="mb-1">
                            <FaBolt className="me-2 text-warning" /> Fuel: {car.fuel}
                        </p>
                        <p className="mb-1">
                            <FaCog className="me-2 text-secondary" /> Transmission: Auto
                        </p>

                        {/* Price */}
                        <div className="my-3 p-3 rounded shadow-sm bg-light text-dark">
                            <h4 className="fw-bold mb-0">
                                ₹{car.rentPerDay}/day
                            </h4>
                            <small className="text-muted">Best Price Guaranteed</small>
                        </div>

                        {/* Status */}
                        <p
                            className="fw-semibold"
                            style={{ color: car.status.toLowerCase() === "available" ? "green" : "red" }}
                        >
                            {car.status}
                        </p>

                        {/* Ratings */}
                        <div className="mb-3">
                            <span className="me-2 fw-semibold">Customer Rating:</span>
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < 4 ? "text-warning" : "text-secondary"} />
                            ))}
                            <small className="ms-2 text-muted">(4.0 / 5)</small>
                        </div>

                        {/* Description */}
                        <p className="mb-4" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                            This premium car offers comfort, style, and advanced features for a smooth driving experience. Perfect for long trips or city rides.
                        </p>

                        {/* Action Buttons */}
                        {car.status.toLowerCase() === "available" ? (
                            <button onClick={handleBooking} className="btn btn-primary me-2 px-4 py-2 rounded-pill shadow-sm">
                                Book Now
                            </button>
                        ) : (
                            <button className="btn btn-secondary me-2 px-4 py-2 rounded-pill shadow-sm" disabled>
                                Not Available
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocalCarDetails;
