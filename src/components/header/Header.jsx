import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import style from "./Header.module.css";

const genres = [
  { name: "Action", path: "/genres/28", id: 28 },
  { name: "Adventure", path: "/genres/12", id: 12 },
  { name: "Sci-fi", path: "/genres/878", id: 878 },
  { name: "Romance", path: "/genres/10749", id: 10749 },
  { name: "Western", path: "/genres/37", id: 37 },
  { name: "Documentary", path: "/genres/99", id: 99 },
];

function NavbarComponent() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout method from useAuth
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{ backgroundColor: "#333" }}
    >
      <Container fluid>
        <Navbar.Brand
          as={NavLink}
          to="/"
          style={{ color: "#ffd700", fontWeight: "bold", fontSize: "24px" }}
        >
          My Movie App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-movie-app" />
        <Navbar.Collapse id="navbar-movie-app">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end className={style.link}>
              Home
            </Nav.Link>
            <NavDropdown
              title="Categories"
              id="nav-dropdown-genres"
              style={{ color: "#ffd700" }}
            >
              {genres.map((genre) => (
                <NavDropdown.Item
                  as={NavLink}
                  to={genre.path}
                  style={{ backgroundColor: "#333", color: "#ffd700" }}
                  key={genre.id}
                >
                  {genre.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          {/* Search Form */}
          {/* Implementation here... */}
          <button
            onClick={isAuthenticated ? handleLogout : () => navigate("/login")}
            style={{
              backgroundColor: "#ffd700",
              color: "#333",
              border: "none",
              padding: "10px 20px",
              marginLeft: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: "bolder",
            }}
          >
            {isAuthenticated ? "Logout" : "Sign In"}
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
