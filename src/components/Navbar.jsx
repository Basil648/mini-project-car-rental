import { Navbar, Nav, Container } from "react-bootstrap";
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
            <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Link href="#another">Link</Nav.Link>
          </Nav>

          {/* Search Icon */}
          <Link to="/search" className="ms-3">
            <i
              className="bi bi-search"
              style={{ fontSize: "1.3rem", color: "black", cursor: "pointer" }}
            ></i>
          </Link>

          {/* Logout Button */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "15px",
                padding: "5px 12px",
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
