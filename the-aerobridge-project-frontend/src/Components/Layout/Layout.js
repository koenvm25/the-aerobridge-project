import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Layout.css";

import { Sidenav } from "../Sidenav/Sidenav";

const Layout = ({ children }) => {
  return (
    <Container fluid="xl" className="mainContainer">
      <Row className="mainRow">
        <Col className="sideNavbar" xs={3} sm={3} md={3} lg={3}>
          <Sidenav />
        </Col>
        <Col className="mainFrame" xs={9} sm={9} md={9} lg={9}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
