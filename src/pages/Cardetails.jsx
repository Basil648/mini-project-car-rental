import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import '../App.css'
import Carousel from 'react-bootstrap/Carousel';
import { Badge } from "react-bootstrap";
import { FaUserFriends, FaBolt, FaCog, FaStar } from "react-icons/fa";

function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/basil648/my_fake_api/cars/${id}`)
            .then(res => res.json())
            .then(data => setCar(data))
            .catch(err => console.error("Error fetching cars:", err));
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

                    {/* Carousel column - left */}
                    <div className="col-md-6">
                        <Carousel fade indicators={true}>
                            {car.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100 rounded shadow"
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        style={{ maxHeight: "420px", objectFit: "cover" }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>

                    {/* Details column - right */}
                    <div className="col-md-6">
                        {/* Car title */}
                        <div className="d-flex align-items-center mb-2">
                            <h1 className="fw-bold me-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                                {car.name}
                            </h1>
                            <Badge bg="info" className="ms-2"> Hot Deal</Badge>
                            {car.fuel === "Electric" && <Badge bg="success" className="ms-2"> Electric</Badge>}
                        </div>

                        {/* Quick specs */}
                        <p className="mb-1">
                            <FaUserFriends className="me-2 text-primary" /> Seats: {car.seats}
                        </p>
                        <p className="mb-1">
                            <FaBolt className="me-2 text-warning" /> Fuel: {car.fuel}
                        </p>
                        <p className="mb-1">
                            <FaCog className="me-2 text-secondary" /> Transmission: {car.transmission || "Auto"}
                        </p>

                        {/* Price */}
                        <div className="my-3 p-3 rounded shadow-sm bg-light text-dark">
                            <h4 className="fw-bold mb-0">
                                ${car.rentPerDay}/day
                            </h4>
                            <small className="text-muted">Best Price Guarantee</small>
                        </div>

                        {/* Status */}
                        <p className="fw-semibold" style={{ color: car.status === "Available" ? "green" : "red" }}>
                            {car.status}
                        </p>

                        {/* Features */}
                        <div className="mb-3">
                            <h5 className="fw-bold">Highlighted Features</h5>
                            <ul className="ps-3">
                                {car.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>

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
                            {car.description || "This premium car offers comfort, style, and advanced features for a smooth driving experience. Perfect for long trips or city rides."}
                        </p>

                        {/* Action Buttons */}
                        {car.status === "Available" ? (
                            <Link to={`/booking/${car.id}`} className="btn btn-primary me-2 px-4 py-2 rounded-pill shadow-sm">
                                 Book Now
                            </Link>
                        ) : (
                            <button className="btn btn-secondary me-2 px-4 py-2 rounded-pill shadow-sm" disabled>
                                Not Available
                            </button>
                        )}

                        <a
                            href={car.find}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-danger px-4 py-2 rounded-pill shadow-sm"
                        >
                             Find my Car
                        </a>
                    </div>
                </div>

              
            </div>
        </div>
    );
}

export default CarDetails;
