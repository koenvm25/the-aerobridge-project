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
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ReturnArrow from "../../Components/ReturnArrow";
import { getSerie } from "../../Api/endpoints";

const Serie = () => {
  const [serieData, setSerieData] = useState([]);
  const [masterComponents, setMasterComponents] = useState([]);
  const [model, setModel] = useState([]);

  let params = useParams();

  useEffect(() => {
    getSerie(params.serieId)
      .then((response) => {
        setSerieData(response.data);
        setMasterComponents(response.data.masterComponents);
        setModel(response.data.model);
      })
      .catch((error) => {});
  }, [params.serieId]);

  return (
    <Container>
      <Row>
        <ReturnArrow to={`/models/${params.modelId}`} name="Series" />
      </Row>
      <Row>
        <Col>
          <Row>
            <h1>Serie {serieData.serie}</h1>
          </Row>
          <Row>
            <p>Of model {model.name}</p>
          </Row>
        </Col>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Header>
                General info{" "}
                <Link
                  to={`/models/${params.modelId}/serie/${params.serieId}/edit`}
                >
                  <Button className="edit-model-button" variant="warning">
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </Link>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Image
                    fluid
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSagEvCRjz5AGAhpjskkcc7IWUGsm1er87Hug&usqp=CAU"
                  ></Image>
                </ListGroup.Item>
                <ListGroup.Item>Name: {model.name}</ListGroup.Item>
                <ListGroup.Item>
                  Popular name: {model.popularName}
                </ListGroup.Item>
                <ListGroup.Item>Category: {model.category}</ListGroup.Item>
                <ListGroup.Item>
                  Maximum endurance (mins): {serieData.maxEndurance}
                </ListGroup.Item>
                <ListGroup.Item>
                  Maximum range (kms): {serieData.maxRange}
                </ListGroup.Item>
                <ListGroup.Item>
                  Maximum speed (km / hr): {serieData.maxSpeed}
                </ListGroup.Item>
                <ListGroup.Item>Dimensions (mm):</ListGroup.Item>
                <ListGroup.Item>
                  Length: {serieData.dimensionLength}
                </ListGroup.Item>
                <ListGroup.Item>
                  Width: {serieData.dimensionWidth}
                </ListGroup.Item>
                <ListGroup.Item>
                  Height: {serieData.dimensionHeight}
                </ListGroup.Item>
                <ListGroup.Item>
                  Created at: {serieData.createdAt}
                </ListGroup.Item>
                <ListGroup.Item>
                  Updated at: {serieData.updatedAt}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>
                <Link
                  to={`/models/${params.modelId}/serie/${params.serieId}/edit-master-components`}
                >
                  <Button className="edit-serie-button-1" variant="warning">
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </Link>
                {"  "} Master Components
              </Card.Header>
              <Table striped hover text-center responsive="xs">
                <thead>
                  <tr>
                    <th>Family</th>
                    <th>Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {masterComponents.map((data) => {
                    return (
                      <tr>
                        <td>{data.masterComponent.family}</td>
                        <td>{data.masterComponent.name}</td>
                        <td>{data.quantity}</td>
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
