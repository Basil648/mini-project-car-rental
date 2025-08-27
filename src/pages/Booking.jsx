import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Booking() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/basil648/my_fake_api/cars/${id}`)
            .then((res) => res.json())
            .then((data) => setCar(data))
            .catch((err) => console.error("Error fetching cars:", err));
    }, [id]);

    if (!car) return <p>Loading car details...</p>;

    const handleBooking = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left Side - Car Info */}
                <div className="col-md-6">
                    <h1>{car.name}</h1>
                    <img
                        src={car.image}
                        alt={car.name}
                        style={{ height: "370px", width: "460px", borderRadius: "8px" }}
                    />
                    <p className="mt-3">Seats: {car.seats}</p>
                    <p>Price: ${car.rentPerDay}/day</p>
                </div>

                {/* Right Side - Booking Form */}
                <div className="col-md-6">
                    <h2>Booking Form</h2>
                    <form onSubmit={handleBooking}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="tel" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Pickup Date</label>
                            <input type="date" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Return Date</label>
                            <input type="date" className="form-control" required />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-pill">
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div
                    className="modal fade show"
                    style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-center p-4">
                            <h4>Booking Confirmed </h4>
                            <p>Your booking for {car.name} has been successfully confirmed.</p>
                            <button
                                className="btn btn-primary mt-3"
                                onClick={() => setShowPopup(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Booking;
