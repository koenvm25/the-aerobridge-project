import { React, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Table, Col, Button, Row, Form, FormGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CancelWarning } from "../../Components/CancelWarning";
import { getSerie } from "../../Api/endpoints";
import { postAircraft } from "../../Api/endpoints";

const BuildInfo = () => {
  const [operator, setOperator] = useState("");
  const [status, setStatus] = useState("In Assembly");
  const [masterComponents, setMasterComponents] = useState([]);
  const [serie, setSerie] = useState([]);
  const [manufacturer, setManufacturer] = useState("Aerobridge");
  const [model, setModel] = useState([]);

  let params = useParams();
  let navigate = useNavigate();

  const handlePost = () => {
    postAircraft(
      model.name,
      model.category,
      operator,
      manufacturer,
      status,
      serie.serieId
    )
      .then((response) => {
        navigate(`/aircraft/${response.data}`);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getSerie(params.serieId)
      .then((response) => {
        setSerie(response.data);
        setMasterComponents(response.data.masterComponents);
        setModel(response.data.model);
      })
      .catch((error) => {});
  }, [params.serieId]);

  return (
    <Container>
      <Row>
        <h1>
          Serie {serie.serie} of Model {model.name}
        </h1>
      </Row>
      <Row>
        <Col>
          <Row>
            <Table striped bordered hover text-center responsive="xs">
              <thead>
                <p>Master components</p>
                <tr>
                  <th>Family</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Available stock</th>
                </tr>
              </thead>
              <tbody>
                {masterComponents.map((data) => {
                  return (
                    <tr>
                      <td>{data.masterComponent.family}</td>
                      <td>{data.masterComponent.name}</td>
                      <td>{data.quantity}</td>
                      <td>{data.masterComponent.availableStock}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Row>
              <Col>
                <Form>
                  <FormGroup className="buildStatus">
                    <Form.Label>Select new Assembly status</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option value="In Assembly">In Assembly</option>
                      <option value="Available">Available</option>
                    </Form.Control>
                  </FormGroup>
                  <Form.Group className="mb-3">
                    <Form.Label>Operator</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter operator name"
                      onChange={(e) => setOperator(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Manufacturer</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter manufacturer"
                      onChange={(e) => setManufacturer(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Col className="mb-3 ">
              <Button
                onClick={() => handlePost()}
                variant="primary"
                type="button"
              >
                Build your aircraft
              </Button>
              {CancelWarning("/builds")}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};

export default BuildInfo;
