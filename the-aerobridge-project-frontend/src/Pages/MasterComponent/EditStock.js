import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Stack,
  Button,
  Form,
  FormGroup,
} from "react-bootstrap";
import ReturnArrow from "../../Components/ReturnArrow";
import "./MasterComponent.css";
import { getComponent, updateComponentStatus } from "../../Api/endpoints";

const AddStock = (props) => {
  const [apiData, setApiData] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const editLocation = useLocation();
  const from = editLocation.state?.from;

  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    getComponent(params.stockId)
      .then((response) => {
        setApiData(response.data);
      })
      .catch(function (error) {});
  }, [params.stockId]);

  const updateStock = () => {
    updateComponentStatus(params.stockId, status, location)
      .catch(function (error) {})
      .then(() => {
        navigate(`/master-component/${params.id}`);
      });
  };

  const backButtonAction = () => {
    navigate(`/master-component/${params.id}`);
  };

  const stockEditChoice = () => {
    if (from === true) {
      return (
        <Form.Group>
          <Form.Label>Select new location</Form.Label>
          <Form.Control
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </Form.Group>
      );
    } else {
      return (
        <FormGroup>
          <Form.Label>Select new stock status</Form.Label>
          <Form.Control
            as="select"
            placeholder={apiData.status}
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
      );
    }
  };

  return (
    <Container>
      <Row>
        <ReturnArrow to="/" name="Dashboard" />
      </Row>
      <Container className="addStockContainer">
        <Stack gap={2} className="col-md-4 mx-auto">
          <Row className="justify-content-center align-self-center">
            <h2>Edit Stock</h2>
          </Row>
          <Row>
            <Col>{stockEditChoice()}</Col>
          </Row>
          <Button variant="success" onMouseUp={updateStock}>
            Edit
          </Button>
          <Button variant="outline-danger" onMouseUp={backButtonAction}>
            Cancel
          </Button>
        </Stack>
      </Container>
    </Container>
  );
};

export default AddStock;
