import { Button } from "react-bootstrap";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <Container className="error-container">
      <Row>
        <Col className="d-flex justify-content-center">
          <h1>Oops!</h1>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <h2>404 Not Found</h2>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <h5> Sorry, an error has occured, Requested page not found!</h5>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Link to="/">
            <Button>Take me home!</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
