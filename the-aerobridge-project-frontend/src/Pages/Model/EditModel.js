import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import ReturnArrow from "../../Components/ReturnArrow";
import { CancelWarning } from "../../Components/CancelWarning";
import { getModel, updateModel } from "../../Api/endpoints";
import { escapeHtml } from "../../Components/Searchbar";

export const EditModel = () => {
  const [modelData, setModelData] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [popularName, setPopularName] = useState("");

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    getModel(params.modelId)
      .then((response) => {
        setModelData(response.data);
      })
      .catch(function (error) {});
  }, [params.modelId]);

  const handleUpdate = () => {
    updateModel(modelData.modelId, name, category, popularName)
      .then(function (response) {
        navigate("/models");
        navigate(0);
      })
      .catch(function (error) {});
  };

  return (
    <Container>
      <Row>
        <ReturnArrow to="/" name="Dashboard" />
      </Row>
      <Row>
        <h1>Update details</h1>
      </Row>
      <Row>
        <Form className="edit-form">
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder={`Currently: ${modelData.name}`}
                onChange={(e) => setName(escapeHtml(e.target.value))}
              />
              <Form.Text>Define the name for this Aircraft Model</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Popular name</Form.Label>
              <Form.Control
                placeholder={`Currently: ${modelData.popularName}`}
                onChange={(e) => setPopularName(escapeHtml(e.target.value))}
              />
              <Form.Text>
                Define the popular name for this Aircraft Model
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                placeholder={`Currently: ${modelData.category}`}
                onChange={(e) => setCategory(escapeHtml(e.target.value))}
              />
              <Form.Text>Define the category for this Aircraft Model</Form.Text>
            </Form.Group>
          </Row>
          <Button variant="primary" type="button" onClick={handleUpdate}>
            Submit
          </Button>
          {CancelWarning("/models")}
        </Form>
      </Row>
    </Container>
  );
};
