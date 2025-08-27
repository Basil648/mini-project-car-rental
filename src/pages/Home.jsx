import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet } from "react-router-dom";

export default function Home() {
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
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>

      {/* Content */}
      <div className="container position-relative text-white">
        <div className="row align-items-center">
          <div
            className="col-12 col-md-8 col-lg-6"
            style={{ marginLeft: "0", maxWidth: "100%" }}
          >
            <h1 className="fw-bold display-4 display-md-3 display-lg-2">
              Welcome to <br />
              <span className="text-primary">Azure Cars</span>
            </h1>
            <p className="h5 text-warning mt-2 d-none d-md-block">
              Drive Your Dreams, Wherever You Go!
            </p>
            <p className="lead mt-3 fs-6 fs-md-5">
              Your trusted partner for affordable and premium car rentals.
              Book your ride today and hit the road with comfort & style.
            </p>
            <Link
              to="/cars"
              className="btn btn-primary btn-md px-5 rounded-pill d-flex align-items-center justify-content-center"
              style={{ fontWeight: "500" }}
            >
              Get Started
              <span style={{ marginLeft: "8px", fontSize: "1.2rem" }}>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive Styling */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-section {
            height: auto;
            padding: 60px 20px;
          }
          .hero-section h1 {
            font-size: 2rem !important;
          }
          .hero-section p.lead {
            font-size: 1rem !important;
          }
          .hero-section .btn {
            width: 100%;
            padding: 12px 0;
          }
        }

        @media (max-width: 480px) {
          .hero-section h1 {
            font-size: 1.5rem !important;
          }
          .hero-section p.h5 {
            font-size: 1rem !important;
          }
          .hero-section p.lead {
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </section>
  );
}
