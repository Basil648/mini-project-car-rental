import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
      <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Hero Section */}
      <section
        className="hero-section position-relative d-flex align-items-center text-white"
        style={{
          height: "100vh",
          backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/30685286/pexels-photo-30685286.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container d-flex flex-column align-items-center justify-content-center text-center">
          <h1 className="fw-bold display-3 animate__animated animate__fadeInDown">
            Welcome to <span className="text-primary">AZURE CARS</span>
          </h1>
          <p className="h5 text-warning mt-3 animate__animated animate__fadeInUp">
            Drive Your Dreams, Wherever You Go!
          </p>
          <p className="lead mt-3 w-75 mx-auto animate__animated animate__fadeInUp">
            Your trusted partner for affordable and premium car rentals. Book
            your ride today and hit the road with comfort & style.
          </p>
          <Link
            to="/cars"
            className="btn btn-primary btn-lg px-5 rounded-pill mt-3 shadow-lg"
            style={{ fontWeight: "600" }}
          >
            Get Started &rarr;
          </Link>
        </div>
      </section>

      {/* Login Button */}
      <button 
        style={{ 
          backgroundColor: "gray", 
          position: "fixed", 
          top: "20px", 
          right: "20px", 
          borderRadius: "25px", 
          padding: "10px 20px",
          zIndex: "1000"
        }}
      >
        <Link 
          to="/login" 
          style={{ 
            textDecoration: "none", 
            color: "white" 
          }}
        >
          Login
        </Link>
      </button>

      {/* Services Section */}
      <section className="py-5 text-center bg-light">
        <div className="container">
          <h2 className="fw-bold mb-5 display-5 text-dark"> Services We Offer</h2>
          <div className="row g-4">
            {[
              {
                title: "Daily Rentals",
                desc: "Affordable daily rental options with flexible timing.",
                img: "https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg",
              },
              {
                title: "Luxury Rides",
                desc: "Premium vehicles for weddings, events, and VIP experiences.",
                img: "https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg",
              },
              {
                title: "Easy Payments",
                desc: "Flexible payment methods, including cards, UPI, and wallets.",
                img: "https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg",
              },
              {
                title: "24/7 Support",
                desc: "Round-the-clock customer support to assist you anytime.",
                img: "https://images.pexels.com/photos/7689884/pexels-photo-7689884.jpeg",
              },
              {
                title: "GPS Navigation",
                desc: "Get real-time GPS navigation and avoid getting lost on your trips.",
                img: "https://images.pexels.com/photos/244822/pexels-photo-244822.jpeg",
              },
              {
                title: " Damage Protection & Insurance Options",
                desc: "Stay protected on every ride with flexible damage coverage",
                img: "https://images.pexels.com/photos/2265634/pexels-photo-2265634.jpeg",
              },
            ].map((service, i) => (
              <div key={i} className="col-md-4">
                <div
                  className="card h-100 border-0 shadow-lg p-5 rounded-4 service-card d-flex flex-column align-items-center justify-content-center"
                  style={{
                    minHeight: "380px",
                    background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
                  }}
                >
                  {/* Service Image */}
                  <img
                    src={service.img}
                    alt={service.title}
                    className="mb-4"
                    style={{ width: "200px", height: "200px", objectFit: "contain" }}
                  />

                  {/* Service Title */}
                  <h5 className="fw-bold text-primary">{service.title}</h5>

                  {/* Service Description */}
                  <p className="text-muted mt-2">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested Cars Section */}
      <section className="py-5" style={{ background: "linear-gradient(135deg, #f5f7fa, #e8eefc)" }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-5 display-5"> Suggested Cars</h2>
          <div className="row g-4 justify-content-center">
            {[
              {
                name: "Tesla Model S",
                price: "$120/day",
                img: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
              },
              {
                name: "BMW i8",
                price: "$150/day",
                img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
              },
              {
                name: "Audi R8",
                price: "$200/day",
                img: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
              },
            ].map((car, i) => (
              <div key={i} className="col-md-4">
                <div className="card border-0 shadow-lg rounded-4 h-100 car-card">
                  <img
                    src={car.img}
                    className="card-img-top rounded-top-4"
                    alt={car.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="fw-bold">{car.name}</h5>
                    <p className="text-muted">{car.price}</p>
                    <button className="btn btn-outline-primary rounded-pill px-4">
                      <Link to={"/cars"} style={{ textDecoration: "none", color: "black" }}> View Cars</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-5 display-5"> Meet Our Team</h2>
          <div className="row g-4">
            {[
              { name: "John Doe", role: "CEO", img: "https://randomuser.me/api/portraits/men/11.jpg" },
              { name: "Jane Smith", role: "Operations Manager", img: "https://randomuser.me/api/portraits/women/12.jpg" },
              { name: "David Lee", role: "Manager", img: "https://randomuser.me/api/portraits/men/13.jpg" },
              { name: "Emily Johnson", role: "Public Relation Officer", img: "https://randomuser.me/api/portraits/women/14.jpg" },
            ].map((person, i) => (
              <div key={i} className="col-md-3">
                <div className="team-card p-3">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="rounded-circle border border-3 border-primary shadow mb-3"
                    width="120"
                    height="120"
                  />
                  <h6 className="fw-bold">{person.name}</h6>
                  <p className="text-muted">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-5"
        style={{ background: "linear-gradient(135deg, #e3f2fd, #ffffff)" }}
      >
        <div className="container text-center">
          <h2 className="fw-bold mb-5 display-5"> What Our Clients Say</h2>
          <div className="row g-4 justify-content-center">
            {[
              {
                text: "Azure Cars made my trip seamless. The booking was smooth and the car was in excellent condition!",
                author: "Michael Carter",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                text: "Professional team and top-class vehicles. Highly recommend their services!",
                author: "Sarah Williams",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                text: "Great experience overall. Affordable pricing and the staff was really supportive.",
                author: "Alex Brown",
                img: "https://randomuser.me/api/portraits/men/76.jpg",
              },
            ].map((t, i) => (
              <div key={i} className="col-md-4">
                <div
                  className="card border-0 shadow-lg p-5 h-100 rounded-4 testimonial-card d-flex flex-column align-items-center justify-content-between"
                  style={{ minHeight: "380px" }}
                >
                  {/* Avatar */}
                  <img
                    src={t.img}
                    alt={t.author}
                    className="rounded-circle mb-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover", border: "3px solid #0d6efd" }}
                  />

                  {/* Text */}
                  <p className="fst-italic text-muted flex-grow-1">“{t.text}”</p>

                  {/* Author */}
                  <h6 className="fw-bold mt-3 text-primary">– {t.author}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

        .service-card:hover, .car-card:hover, .testimonial-card:hover {
          transform: translateY(-8px);
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        @media (max-width: 768px) {
          .hero-section {
            background-size: cover;
            background-attachment: scroll;
          }
        }
      `}</style>
    </div>
  );
}
