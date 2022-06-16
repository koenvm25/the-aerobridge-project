import { React, useState } from "react";
import {
  Row,
  Col,
  Button,
  Container,
  Figure,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import "../Pages/Homepage.css";

const Homepage = () => {
  const [aerobridgeId, setAerobridgeId] = useState("");
  const escapeHtml = (unsafe) => {
    return unsafe
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  };
  let navigate = useNavigate();

  return (
    <Container fluid>
      <Row className="center">
        <Figure>
          <Figure.Image alt="" src={logo} width="750" height="250" />{" "}
        </Figure>
      </Row>
      <Row>
        <Col>
          <InputGroup>
            <FormControl
              placeholder="Search Aerobridge ID"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={(e) => setAerobridgeId(escapeHtml(e.target.value))}
              onKeyPress={(event) =>
                event.key === "Enter" && navigate(`search/${aerobridgeId}`)
              }
            />
            <Link to={`/search/${aerobridgeId}`}>
              <Button variant="outline-secondary" id="button-addon2">
                Search
              </Button>
            </Link>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
