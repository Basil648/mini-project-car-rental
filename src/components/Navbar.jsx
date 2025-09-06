import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#" className="mx-auto fw-bold">
          Azure Cars
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* Centered Nav Links */}
          <Nav
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/" style={{ textDecoration: "none" }}>Home</Link>
            </Nav.Link>
            <Nav.Link >
              <Link to="/cars" style={{ textDecoration: "none" }}>Cars</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about" style={{ textDecoration: "none" }}>About</Link>
            </Nav.Link>
            <Nav.Link >
              <Link to="/contact" style={{ textDecoration: "none" }}>Contact</Link>
            </Nav.Link>

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
