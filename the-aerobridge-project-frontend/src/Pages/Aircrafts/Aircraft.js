import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Container,
  Card,
  ListGroup,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ReturnArrow from "../../Components/ReturnArrow";
import { getAircraft } from "../../Api/endpoints";

const Serie = () => {
  const [aircraftData, SetAircraftData] = useState([]);
  const [components, setComponents] = useState([]);

  let params = useParams();

  useEffect(() => {
    getAircraft(params.aircraftId)
      .then((response) => {
        console.log(response.data);
        SetAircraftData(response.data);
        setComponents(response.data.components);
      })
      .catch((error) => {});
  }, [params.aircraftId]);

  return (
    <Container>
      <Row>
        <ReturnArrow to={`/aircrafts`} name="Aircrafts" />
      </Row>
      <Row>
        <Col>
          <Row>
            <h1>Aircraft {aircraftData.name}</h1>
          </Row>
        </Col>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Header>General info </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Image
                    fluid
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSagEvCRjz5AGAhpjskkcc7IWUGsm1er87Hug&usqp=CAU"
                  ></Image>
                </ListGroup.Item>
                <ListGroupItem>ID: {aircraftData.aerobridgeId} </ListGroupItem>
                <ListGroup.Item>Name: {aircraftData.name}</ListGroup.Item>
                <ListGroup.Item>Status: {aircraftData.status}</ListGroup.Item>
                <ListGroup.Item>
                  Category: {aircraftData.category}
                </ListGroup.Item>
                <ListGroup.Item>
                  Created at: {aircraftData.createdAt}
                </ListGroup.Item>
                <ListGroup.Item>
                  Updated at: {aircraftData.updatedAt}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>
                Components
                <Link to={`/aircraft/edit/${aircraftData.aircraftId}`}>
                  <Button className="airc-comp-btn" variant="warning">
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </Link>
              </Card.Header>
              <Table striped hover text-center responsive="xs">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {components.map((component) => {
                    return (
                      <tr>
                        <td>{component.name}</td>
                        <td>{component.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Serie;
