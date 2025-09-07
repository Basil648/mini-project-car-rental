import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRef, useState, useEffect } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const homeRef = useRef(null);
  const carsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    let activeRef;
    switch (location.pathname) {
      case "/":
        activeRef = homeRef;
        break;
      case "/cars":
        activeRef = carsRef;
        break;
      case "/about":
        activeRef = aboutRef;
        break;
      case "/contact":
        activeRef = contactRef;
        break;
      default:
        activeRef = null;
    }

    if (activeRef && activeRef.current) {
      const { offsetLeft, offsetWidth } = activeRef.current;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    } else {
      setUnderlineStyle({ left: 0, width: 0 });
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* Centered Nav Links */}
          <Nav
            className="mx-auto my-2 my-lg-0 d-flex align-items-center position-relative"
            style={{ maxHeight: "100px", gap: "2rem" }} // even spacing
            navbarScroll
          >
            <Nav.Link as={Link} to="/" ref={homeRef} className="text-dark">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cars" ref={carsRef} className="text-dark">
              Cars
            </Nav.Link>
            <Nav.Link as={Link} to="/about" ref={aboutRef} className="text-dark">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" ref={contactRef} className="text-dark">
              Contact
            </Nav.Link>

            {/* Sliding Underline */}
            <div
              className="position-absolute bottom-0 bg-primary"
              style={{
                height: "2px",
                transition: "left 0.3s ease, width 0.3s ease",
                ...underlineStyle,
              }}
            />
          </Nav>


          {/* Search Icon */}
          <Link to="/search" className="ms-3">
            <i
              className="bi bi-search"
              style={{ fontSize: "1.3rem", color: "black", cursor: "pointer" }}
            ></i>
          </Link>

          {/* Heart Icon (Wishlist) */}
          <Link to="/wishlist" className="ms-3">
            <i
              className="bi bi-heart"
              style={{ fontSize: "1.3rem", color: "black", cursor: "pointer" }}
            ></i>
          </Link>

          {/* User Icon with Dropdown */}
          {isLoggedIn && (
            <Dropdown align="end" className="ms-3">
              <Dropdown.Toggle
                as="span"
                style={{ cursor: "pointer" }}
                id="dropdown-user"
              >
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "1.5rem", color: "black" }}
                ></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}