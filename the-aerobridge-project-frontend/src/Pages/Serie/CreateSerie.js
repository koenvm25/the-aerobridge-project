import {
  Row,
  Col,
  Container,
  Form,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { CancelWarning } from "../../Components/CancelWarning";
import { postSerie } from "../../Api/endpoints";
import { escapeHtml } from "../../Components/Searchbar";

export const CreateSerie = () => {
  let params = useParams();
  let navigate = useNavigate();
  const [serie, setSerie] = useState("");
  const [maxRange, setMaxRange] = useState("");
  const [maxSpeed, setMaxSpeed] = useState("");
  const [maxEndurance, setMaxEndurance] = useState("");
  const [dimensionWidth, setDimensionWidth] = useState("");
  const [dimensionLength, setDimensionLength] = useState("");
  const [dimensionHeight, setDimensionHeight] = useState("");

  const [validated, setValidated] = useState(false);
  let warningMessage = "This field is required";

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === true) {
      handlePost();
    }
  };

  const handlePost = () => {
    postSerie(
      params.modelId,
      serie,
      maxEndurance,
      maxRange,
      maxSpeed,
      dimensionLength,
      dimensionWidth,
      dimensionHeight
    )
      .then((response) => {
        const id = response.data.serieId;
        navigate(`/models/${params.modelId}/serie/${id}/add-master-components`);
        navigate(0);
      })
      .catch(function (error) {});
  };

  return (
    <Container>
      <Row>
        <h2>Create a new serie</h2>
      </Row>
      <Row>
        <ProgressBar animated now="50" label="Step 1/2" />
      </Row>
      <Row>
        <p>Step 1: Adding general info</p>
      </Row>
      <Row>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter serie name"
                  type="text"
                  onChange={(e) => setSerie(escapeHtml(e.target.value))}
                />
                <Form.Control.Feedback type="invalid">
                  {warningMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Max endurance</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter max endurance"
                  type="number"
                  onChange={(e) => setMaxEndurance(escapeHtml(e.target.value))}
                />
                <Form.Control.Feedback type="invalid">
                  {warningMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Max range</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter max range"
                  type="number"
                  onChange={(e) => setMaxRange(escapeHtml(e.target.value))}
                />
                <Form.Control.Feedback type="invalid">
                  {warningMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Max speed</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter max speed"
                  type="number"
                  onChange={(e) => setMaxSpeed(escapeHtml(e.target.value))}
                />
                <Form.Control.Feedback type="invalid">
                  {warningMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Dimension length</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter a length"
                  type="number"
                  onChange={(e) =>
                    setDimensionLength(escapeHtml(e.target.value))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {warningMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Dimension width</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter a width"
                  type="number"
                  onChange={(e) =>
                    setDimensionWidth(escapeHtml(e.target.value))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {warningMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Dimension height</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter a height"
                  type="number"
                  onChange={(e) =>
                    setDimensionHeight(escapeHtml(e.target.value))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {warningMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" type="submit">
            Submit
          </Button>
          {CancelWarning(`/models/${params.modelId}`)}
        </Form>
      </Row>
    </Container>
  );
};
