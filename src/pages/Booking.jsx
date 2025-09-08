import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";

function Booking() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/basil648/my_fake_api/cars/${id}`)
            .then((res) => res.json())
            .then((data) => setCar(data))
            .catch((err) => console.error("Error fetching cars:", err));
    }, [id]);

    if (!car) return <p>Loading car details...</p>;

    const today = new Date().toISOString().split("T")[0];

    const handleBooking = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const fullName = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const pickup = formData.get("pickup");
        const returnDate = formData.get("return");

        // Validation: pickup >= today
        if (pickup < today) {
            alert("Pickup date cannot be in the past.");
            return;
        }

        // Validation: return >= pickup
        if (returnDate < pickup) {
            alert("Return date cannot be before pickup date.");
            return;
        }

        // Calculate number of days
        const pickupDateObj = new Date(pickup);
        const returnDateObj = new Date(returnDate);
        const diffTime = returnDateObj - pickupDateObj;
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive of pickup day
        const totalPrice = days * car.rentPerDay;

        setBookingDetails({ fullName, email, phone, pickup, returnDate, days, totalPrice });
        setShowPopup(true);
    };

    const downloadInvoice = () => {
        if (!bookingDetails) return;
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Car Rental Invoice", 20, 20);

        doc.setFontSize(12);
        doc.text(`Name: ${bookingDetails.fullName}`, 20, 40);
        doc.text(`Email: ${bookingDetails.email}`, 20, 50);
        doc.text(`Phone: ${bookingDetails.phone}`, 20, 60);
        doc.text(`Car: ${car.name}`, 20, 70);
        doc.text(`Pickup Date: ${bookingDetails.pickup}`, 20, 80);
        doc.text(`Return Date: ${bookingDetails.returnDate}`, 20, 90);
        doc.text(`Days: ${bookingDetails.days}`, 20, 100);
        doc.text(`Price per Day: $${car.rentPerDay}`, 20, 110);
        doc.text(`Total Price: $${bookingDetails.totalPrice}`, 20, 120);

        doc.save("invoice.pdf");
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left Side - Car Info */}
                <div className="col-md-6">
                    <h1>{car.name}</h1>
                    {car.images && car.images.length > 0 && (
                        <img
                            src={car.images[0]}
                            alt={car.name}
                            style={{
                                height: "370px",
                                width: "460px",
                                borderRadius: "8px",
                                marginBottom: "10px",
                            }}
                        />
                    )}

                    <p className="mt-3">Seats: {car.seats}</p>
                    <p>Price: ${car.rentPerDay}/day</p>
                </div>

                {/* Right Side - Booking Form */}
                <div className="col-md-6">
                    <h2>Booking Form</h2>
                    <form onSubmit={handleBooking}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" name="name" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="tel" name="phone" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Pickup Date</label>
                            <input
                                type="date"
                                name="pickup"
                                className="form-control"
                                min={today}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Return Date</label>
                            <input
                                type="date"
                                name="return"
                                className="form-control"
                                min={today}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success w-100 rounded-pill"
                        >
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>

            {/* Popup Modal */}
            {showPopup && bookingDetails && (
                <div
                    className="modal fade show"
                    style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-center p-4">
                            <h4>Booking Confirmed </h4>
                            <p>Your booking for <b>{car.name}</b> has been confirmed.</p>
                            <p>
                                <b>Name:</b> {bookingDetails.fullName} <br />
                                <b>Email:</b> {bookingDetails.email} <br />
                                <b>Phone:</b> {bookingDetails.phone} <br />
                                <b>Pickup:</b> {bookingDetails.pickup} <br />
                                <b>Return:</b> {bookingDetails.returnDate} <br />
                                <b>Days:</b> {bookingDetails.days} <br />
                                <b>Total Price:</b> ${bookingDetails.totalPrice}
                            </p>
                            <button className="btn btn-primary mt-3 me-2" onClick={downloadInvoice}>
                                Download Invoice
                            </button>
                            <button
                                className="btn btn-secondary mt-3"
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
