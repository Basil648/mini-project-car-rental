import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Hero() {
    return (
        <section
            className="hero-section position-relative d-flex align-items-center"
            style={{
                height: "100vh",
                backgroundImage: "url('/car2.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay for better visibility */}
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            ></div>

            {/* Content */}
            <div
                className="position-relative text-white"
                style={{
                    maxWidth: "600px",
                    marginLeft: "50px", 
                }}
            >
                <h1 className="display-3 fw-bold">
                    Welcome to<br></br> <span className="text-primary">Azure Cars</span>
                </h1>
                <p className="h4 text-warning mt-2">
                    Drive Your Dreams, Wherever You Go!
                </p>
                <p className="lead mt-3">
                    Your trusted partner for affordable and premium car rentals.
                    Book your ride today and hit the road with comfort & style.
                </p>
                <button className="btn btn-primary btn-lg rounded-pill mt-4 shadow">
                     Get Started
                </button>
            </div>
        </section>
    );
}
