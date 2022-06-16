import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Stack,
  Button,
  Form,
  FormGroup,
} from "react-bootstrap";

import { CancelWarning } from "../../Components/CancelWarning";

import "./MasterComponent.css";
import ReturnArrow from "../../Components/ReturnArrow";
import { addStock } from "../../Api/endpoints";

const AddStock = (props) => {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

  let navigate = useNavigate();
  let params = useParams();

  const postData = () => {
    addStock(params.id, amount, status, location)
      .catch(function (error) {
        console.log(error);
      })
      .then(() => {
        navigate(`/master-component/${params.id}`);
      });
  };

  return (
    <Container>
      <Row>
        <ReturnArrow to="/" name="Dashboard" />
      </Row>
      <Container className="addStockContainer">
        <Stack gap={2} className="col-md-4 mx-auto">
          <Row className="justify-content-center align-self-center">
            <h2>Add Stock</h2>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Form.Label>Select stock amount</Form.Label>
                <Form.Control
                  as="select"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                >
                  <option>Select amount</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Form.Control>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Form.Label>Select stock status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option>Select status</option>
                  <option value="Ordered">Ordered</option>
                  <option value="In Transit">In transit</option>
                  <option value="Available">Available</option>
                </Form.Control>
              </FormGroup>
              <Form.Group className="mb-3">
                <Form.Label>location</Form.Label>
                <Form.Control
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" onMouseUp={postData}>
            Add
          </Button>
          {CancelWarning(`/master-component/${params.id}`)}
        </Stack>
      </Container>
    </Container>
  );
};

export default AddStock;
