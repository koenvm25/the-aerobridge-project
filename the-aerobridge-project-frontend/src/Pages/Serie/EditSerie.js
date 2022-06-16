import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { escapeHtml } from "../../Components/Searchbar";
import { CancelWarning } from "../../Components/CancelWarning";
import { updateSerie, getSerie } from "../../Api/endpoints";

export const EditSerie = () => {
  const [dimensionWidth, setDimensionWidth] = useState("");
  const [dimensionHeight, setDimensionHeight] = useState("");
  const [dimensionLength, setDimensionLength] = useState("");
  const [maxEndurance, setmaxEndurance] = useState("");
  const [maxRange, setMaxRange] = useState("");
  const [maxSpeed, setMaxSpeed] = useState("");
  const [serie, setSerie] = useState("");

  let params = useParams();
  let navigate = useNavigate();

  const [serieData, setSerieData] = useState([]);

  useEffect(() => {
    getSerie(params.serieId)
      .then((response) => {
        setSerieData(response.data);
      })
      .catch((error) => {});
  }, [params.modelId, params.serieId]);

  const handleUpdate = () => {
    updateSerie(
      params.serieId,
      dimensionWidth,
      dimensionHeight,
      dimensionLength,
      maxEndurance,
      maxRange,
      maxSpeed,
      serie
    )
      .then(function (response) {
        navigate(`/models/${params.modelId}/serie/${params.serieId}`);
        navigate(0);
      })
      .catch(function (error) {});
  };

  return (
    <Container>
      <Row>
        <h1>Update details</h1>
      </Row>
      <Row>
        <Form className="edit-form">
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Serie name</Form.Label>
                <Form.Control
                  placeholder={`Currently: ${serieData.serie}`}
                  onChange={(e) => setSerie(escapeHtml(e.target.value))}
                />
                <Form.Text>Set the name of the serie</Form.Text>
              </Form.Group>
            </Col>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Max endurance</Form.Label>
                  <Form.Control
                    placeholder={`Currently: ${serieData.maxEndurance}`}
                    onChange={(e) =>
                      setmaxEndurance(escapeHtml(e.target.value))
                    }
                  />
                  <Form.Text>Set the endurance in minutes</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Max range</Form.Label>
                  <Form.Control
                    placeholder={`Currently: ${serieData.maxRange}`}
                    onChange={(e) => setMaxRange(escapeHtml(e.target.value))}
                  />
                  <Form.Text>Set the range in kms for the aircraft</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Max speed</Form.Label>
                  <Form.Control
                    placeholder={`Currently: ${serieData.maxSpeed}`}
                    onChange={(e) => setMaxSpeed(escapeHtml(e.target.value))}
                  />
                  <Form.Text>Set the maximum speed in km/hr</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Dimension width</Form.Label>
                  <Form.Control
                    placeholder={`Currently: ${serieData.dimensionWidth}`}
                    onChange={(e) =>
                      setDimensionWidth(escapeHtml(e.target.value))
                    }
                  />
                  <Form.Text>Set the width of the aircraft in cms</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Dimension height</Form.Label>
                  <Form.Control
                    placeholder={`Currently: ${serieData.dimensionHeight}`}
                    onChange={(e) =>
                      setDimensionHeight(escapeHtml(e.target.value))
                    }
                  />
                  <Form.Text>Set the height of the aircraft in cms</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Dimension length</Form.Label>
                  <Form.Control
                    placeholder={`Currently: ${serieData.dimensionLength}`}
                    onChange={(e) =>
                      setDimensionLength(escapeHtml(e.target.value))
                    }
                  />
                  <Form.Text>Set the length of the aircraft in cms</Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Row>

          <Button variant="primary" type="button" onClick={handleUpdate}>
            Submit
          </Button>
          {CancelWarning(`/models/${params.modelId}/serie/${params.serieId}`)}
        </Form>
      </Row>
    </Container>
  );
};
