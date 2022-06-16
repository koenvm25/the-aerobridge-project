import { React, useState } from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";
import { InputGroup, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import AircraftStatus from "./AircraftStatus";
import LowStock from "./LowStock";

import "./Dashboard.css";
import { escapeHtml } from "../../Components/Searchbar";

const Dashboard = () => {
  const [aerobridgeId, setAerobridgeId] = useState("");
  let navigate = useNavigate();

  return (
    <Container>
      <Row className="imageRow">
        <Col>
          <Figure className="mainImage">
            <Figure.Image
              alt=""
              src="https://aerobridge.io/images/logo.png"
              width="750"
              height="250"
            />{" "}
          </Figure>
        </Col>
        <Col className="imageText">
          <h2>Management Server</h2>
        </Col>
      </Row>
      <Row className="searchBarRow">
        <Col>
          <InputGroup className="mb-2">
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
      <Row>
        <Col>
          <AircraftStatus />
        </Col>
        <Col>
          <LowStock />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
