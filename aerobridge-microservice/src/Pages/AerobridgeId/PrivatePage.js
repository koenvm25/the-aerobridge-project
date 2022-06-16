import { React, useState, useEffect } from "react";
import Timeline from "../../Components/Timeline/Timeline";
import { Container, Row, Card } from "react-bootstrap";
import "./PrivatePage.css";
import { getAerobridgeId } from "../../Api/endpoints";
import { useParams } from "react-router-dom";
import ErrorPage from "../Error/ErrorPage";
import PrivateAircraft from "./PrivateAircraft";
import { useMediaQuery } from "react-responsive";
import EventTable from "../../Components/EventTable";
import ReturnArrow from "../../Components/ReturnArrow";

const useAerobridgeId = (id) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getAerobridgeId(id)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        checkType(response);
      })
      .catch(function () {
        setType("Error");
      });
  }, []);

  const checkType = (response) => {
    if (Array.isArray(response.data)) {
      setType("Component");
      setName(response.data[0].component.name);
    } else {
      setType("Aircraft");
      setName(response.data.name);
    }
  };

  return [data, name, type];
};

const PrivatePage = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  let params = useParams();

  const [data, name, type] = useAerobridgeId(params.aerobridgeId);

  if (type === "Component" && isDesktopOrLaptop === true) {
    return (
      <Container>
        <Row className="return-arrow-row">
          <ReturnArrow to="/" name="Search" />
        </Row>
        <Row className="private-id-row">
          <Card className="text-center">
            <Card.Header fluid>
              Aerobridge ID: {params.aerobridgeId}
            </Card.Header>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{type}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <Timeline className="timeline-container" data={data} />
        </Row>
      </Container>
    );
  } else if (type === "Component" && isTabletOrMobile === true) {
    return (
      <Container>
        <Row className="return-arrow-row">
          <ReturnArrow to="/" name="Search" />
        </Row>
        <Row className="private-id-row">
          <Card className="text-center">
            <Card.Header fluid>
              Aerobridge ID: {params.aerobridgeId}
            </Card.Header>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{type}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <EventTable data={data} />
        </Row>
      </Container>
    );
  } else if (type === "Aircraft" && isDesktopOrLaptop === true) {
    return (
      <Container>
        <Row className="return-arrow-row">
          <ReturnArrow to="/" name="Search" />
        </Row>
        <Row className="private-id-row">
          <Card className="text-center">
            <Card.Header>Aerobridge ID: {params.aerobridgeId}</Card.Header>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{type}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <PrivateAircraft data={data} />
        </Row>
      </Container>
    );
  } else if (type === "Aircraft" && isTabletOrMobile === true) {
    return (
      <Container>
        <Row className="return-arrow-row">
          <ReturnArrow to="/" name="Search" />
        </Row>
        <Row className="private-id-row">
          <Card className="text-center">
            <Card.Header>Aerobridge ID: {params.aerobridgeId}</Card.Header>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{type}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <PrivateAircraft data={data} />
        </Row>
      </Container>
    );
  } else if (type === "Error") {
    return (
      <Container>
        <ErrorPage />
      </Container>
    );
  } else {
    return <Container />;
  }
};

export default PrivatePage;
