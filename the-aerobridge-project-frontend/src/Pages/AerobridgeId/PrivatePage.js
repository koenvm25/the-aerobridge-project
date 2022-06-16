import { React, useState, useEffect } from "react";
import Timeline from "../../Components/Timeline/Timeline";
import { Container, Row, Card } from "react-bootstrap";
import "./PrivatePage.css";
import { getAerobridgeId } from "../../Api/endpoints";
import { useParams } from "react-router-dom";
import ErrorPage from "../Error/ErrorPage";
import PrivateAircraft from "./PrivateAircraft";
import ReturnArrow from "../../Components/ReturnArrow";

const useAerobridgeId = (id) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getAerobridgeId(id)
      .then((response) => {
        console.log(response);
        setData(response.data);
        checkType(response);
      })
      .catch((error) => {});
  }, [id]);

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
  let params = useParams();

  const [data, name, type] = useAerobridgeId(params.aerobridgeId);

  if (type === "Component") {
    return (
      <Container>
        <Row className="return-arrow-row">
          <ReturnArrow to="/" name="Dashboard" />
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
  } else if (type === "Aircraft") {
    return (
      <Container>
        <Row className="return-arrow-row">
          <ReturnArrow to="/" name="Dashboard" />
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
