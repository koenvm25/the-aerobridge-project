import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ReturnArrow from "../../Components/ReturnArrow";
import { CancelWarning } from "../../Components/CancelWarning";
import { postMasterComponent } from "../../Api/endpoints";
import { escapeHtml } from "../../Components/Searchbar";

const CreateMasterComponent = (props) => {
  const [name, setName] = useState("");
  const [gtinId, setGtinId] = useState("");
  const [family, setFamily] = useState("");
  const [favouriteStore, setFavouriteStore] = useState("");
  const [source, setSource] = useState("");
  var navigate = useNavigate();

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
    postMasterComponent(name, gtinId, family, source, favouriteStore)
      .catch(function (error) {})
      .then((response) => {
        navigate(`/master-component/${response.data}`);
        navigate(0);
      });
  };

  return (
    <Container>
      <Row>
        <ReturnArrow to="/" name="Dashboard" />
      </Row>
      <Row className="header">
        <h2>Create new master component</h2>
      </Row>
      <Row>
        <h5>Create a new blueprint of a master component</h5>
      </Row>
      <Row>
        <Container>
          <Row>
            <Col>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Master component name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="please enter name"
                    onChange={(e) => setName(escapeHtml(e.target.value))}
                  />
                  <Form.Control.Feedback type="invalid">
                    {warningMessage}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Master component GTIN ID</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="please enter GTIN ID"
                    onChange={(e) => setGtinId(escapeHtml(e.target.value))}
                  />
                  <Form.Control.Feedback type="invalid">
                    {warningMessage}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Master component family</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="please enter family"
                    onChange={(e) => setFamily(escapeHtml(e.target.value))}
                  />
                  <Form.Control.Feedback type="invalid">
                    {warningMessage}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Master component supplier</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="please enter the name of the supplier"
                    onChange={(e) => setSource(escapeHtml(e.target.value))}
                  />
                  <Form.Control.Feedback type="invalid">
                    {warningMessage}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Master component favorite store</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="please enter the URL of the master component"
                    onChange={(e) =>
                      setFavouriteStore(escapeHtml(e.target.value))
                    }
                  />
                  <Form.Text>
                    This must be the exact URL of the product page
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    {warningMessage}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="cl-btn" variant="success" type="submit">
                  Submit
                </Button>
                {CancelWarning("/inventory")}
              </Form>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default CreateMasterComponent;
