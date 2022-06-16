import React from "react";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";

import "./Bootnav.css";

const Bootnav = () => {
  return (
    <Navbar className="mainNavBar" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="https://aerobridge.io/images/logo.png"
            width="120"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Management Server
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="/">Admin</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Bootnav;
