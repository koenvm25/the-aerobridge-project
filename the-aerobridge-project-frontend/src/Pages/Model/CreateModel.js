import React, { useState } from "react";
import { Row, Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReturnArrow from "../../Components/ReturnArrow";
import { CancelWarning } from "../../Components/CancelWarning";
import { postModel } from "../../Api/endpoints";
import { escapeHtml } from "../../Components/Searchbar";

export const CreateModel = (props) => {
  const [name, setName] = useState("");
  const [popularName, setPopularName] = useState("");
  const [category, setCategory] = useState("");

  let navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  let warningMessage = "This field is required";

  const handlePost = () => {
    postModel(name, popularName, category).then(() => {
      navigate("/models");
      navigate(0);
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === true) {
      handlePost();
    }
  };

  return (
    <Container>
      <Row>
        <ReturnArrow to="/" name="Dashboard" />
      </Row>
      <Row>
        <h2>Add a new model</h2>
      </Row>
      <Row>
        <h5>Create a new model of aircraft to manufacture / assemble.</h5>
      </Row>
      <Row>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter model name"
              onChange={(e) => setName(escapeHtml(e.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              {warningMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Popular name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter popular name"
              onChange={(e) => setPopularName(escapeHtml(e.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              {warningMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter a category"
              onChange={(e) => setCategory(escapeHtml(e.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              {warningMessage}
            </Form.Control.Feedback>
            <Form.Text>Define the category for this Aircraft Model</Form.Text>
          </Form.Group>
          <Button className="cl-btn" variant="success" type="submit">
            Submit
          </Button>
          {CancelWarning("/models")}
        </Form>
      </Row>
    </Container>
  );
};
