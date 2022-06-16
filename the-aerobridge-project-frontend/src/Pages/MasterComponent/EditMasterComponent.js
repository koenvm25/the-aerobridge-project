import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import ReturnArrow from "../../Components/ReturnArrow";
import { CancelWarning } from "../../Components/CancelWarning";
import { getMasterComponent, updateMasterComponent } from "../../Api/endpoints";
import { escapeHtml } from "../../Components/Searchbar";

const EditMasterComponent = () => {
  const [name, setName] = useState("");
  const [gtinId, setGtinId] = useState("");
  const [family, setFamily] = useState("");
  const [source, setSource] = useState("");
  const [favouriteStore, setFavouriteStore] = useState("");
  const [setPicture] = useState("");

  const [apiData, setApiData] = useState([]);

  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    getMasterComponent(params.id)
      .then((response) => {
        console.log(apiData);
        setApiData(response.data);
      })
      .catch(function (error) {});
  }, [apiData, params.id]);

  const handleUpdate = () => {
    updateMasterComponent(
      params.id,
      name,
      gtinId,
      family,
      source,
      favouriteStore
    )
      .catch(function (error) {})
      .then(() => {
        navigate(`/inventory/`);
        navigate(0);
      });
  };

  return (
    <Container>
      <Row>
        <ReturnArrow to="/" name="Dashboard" />
      </Row>
      <Row className="header">
        <h2>Edit master component</h2>
      </Row>
      <Row>
        <h5>Update the details for: {apiData.name}</h5>
      </Row>
      <Row>
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Aerobridge ID</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={params.id} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Master component name</Form.Label>
                  <Form.Control
                    defaultValue={apiData.name}
                    onChange={(e) => setName(escapeHtml(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Master component GTIN ID</Form.Label>
                  <Form.Control
                    defaultValue={apiData.gtinId}
                    onChange={(e) => setGtinId(escapeHtml(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Master component family</Form.Label>
                  <Form.Control
                    defaultValue={apiData.family}
                    onChange={(e) => setFamily(escapeHtml(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Master component supplier</Form.Label>
                  <Form.Control
                    defaultValue={apiData.source}
                    onChange={(e) => setSource(escapeHtml(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Master component favorite store</Form.Label>
                  <Form.Control
                    defaultValue={apiData.favouriteStore}
                    onChange={(e) =>
                      setFavouriteStore(escapeHtml(e.target.value))
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Master component picture</Form.Label>
                  <Form.Control
                    defaultValue={apiData.picture}
                    onChange={(e) => setPicture(escapeHtml(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Master component date created</Form.Label>
                  <Form.Control plaintext readOnly value={apiData.createdAt} />
                </Form.Group>
                <Button variant="success" onMouseUp={handleUpdate}>
                  Submit
                </Button>
                {CancelWarning(`/master-component/${params.id}`)}
              </Form>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default EditMasterComponent;
