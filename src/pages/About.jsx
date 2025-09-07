import { Container, Row, Col } from "react-bootstrap";

export default function About() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/28891887/pexels-photo-28891887.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh", // increased height
          position: "relative",
          color: "white",
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        ></div>

        {/* Centered content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <h1 className="fw-bold display-4">About Azure Cars</h1>
          <p className="lead">Driven by passion, powered by trust.</p>
        </div>
      </div>

      {/* About Content */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80"
              alt="Luxury Car"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <h2 className="fw-bold">Who We Are</h2>
            <p style={{ textAlign: "justify" }}>
              At <strong>Azure Cars</strong>, we believe that every journey
              deserves the perfect car. Our mission is to provide an exceptional
              car rental experience that combines convenience, affordability, and
              quality. From luxury rides to budget-friendly options, we cater to
              diverse needs while ensuring safety and comfort.
            </p>
            <p style={{ textAlign: "justify" }}>
              Established with a vision to revolutionize the car rental industry,
              we pride ourselves on offering a seamless booking experience,
              well-maintained vehicles, and transparent pricing. Our team is
              passionate about helping you hit the road with confidence, whether
              it’s for business, leisure, or adventure.
            </p>
          </Col>
        </Row>
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

      </Container>
    </div>
  );
}
