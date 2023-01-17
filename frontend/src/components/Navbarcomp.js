import axios from "axios";
import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { myContext } from "../Context";

function Navbarcomp() {
  const context = useContext(myContext);
  console.log("Context in Navbar", context);

  const logout = () => {
    axios
      .get("/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log("Logout:", res);
          window.location.href = "/";
        }
      });
  };
  return (
    <Navbar
      style={{ backgroundColor: "#6E85B7", color: "white" }}
      varient="light"
      sticky="top"
      expand="lg"
    >
      <Container>
        <Navbar.Brand style={{ color: "white" }} as={Link} to="/">
          Audio Marking
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse style={{ flexGrow: 0 }} id="basic-navbar-nav">
          <Nav className="ml-auto">
            {context ? (
              <>
                <Nav.Link style={{ color: "white" }} as={Link} to="/create">
                  Create
                </Nav.Link>
                <Nav.Link style={{ color: "white" }} as={Link} to="/public">
                  Public
                </Nav.Link>
                <Nav.Link style={{ color: "white" }} as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link style={{ color: "white" }} onClick={logout}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link style={{ color: "white" }} as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarcomp;
