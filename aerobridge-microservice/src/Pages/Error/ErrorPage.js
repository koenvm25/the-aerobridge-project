import { Button } from "react-bootstrap";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <Container fluid>
      <Row className="text-center">
          <h1>Oops!</h1>
          <h2>404 Not Found</h2>
          <h5> Sorry, the page you were looking for could not be found</h5>
          <Link to="/">
            <Button>Take me home!</Button>
          </Link>
      </Row>
    </Container>
  );
};

export default ErrorPage;
