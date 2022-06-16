import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ReturnArrow from "../../Components/ReturnArrow";
import { getSeriesByModel, getModel } from "../../Api/endpoints";
import Searchbar, { escapeHtml } from "../../Components/Searchbar";
import SerieTable from "../../Components/Tables/SerieTable";

const Models = () => {
  const [serieData, setSerieData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [query, setQuery] = useState("");

  let params = useParams();

  useEffect(() => {
    getModel(params.modelId)
      .then((response) => {
        setModelData(response.data);
      })
      .catch((error) => {});
    getSeriesByModel(params.modelId)
      .then((response) => {
        setSerieData(response.data);
      })
      .catch((error) => {});
  }, [params.modelId]);

  return (
    <Container>
      <Row>
        <ReturnArrow to="/models" name="Models" />
      </Row>
      <Row>
        <h1>Series of model {modelData.name}</h1>
      </Row>
      <Row>
        <Col>
          <Link to={`/models/${params.modelId}/serie/create`}>
            <Button className="add-model-button">Add serie</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Searchbar
            name="serie"
            method={(e) => setQuery(escapeHtml(e.target.value.toLowerCase()))}
          />
        </Col>
      </Row>
      <Row>
        <Container>
          {serieData.length === 0 ? (
            <Row className="text-center">
              <h4>No data found</h4>
              <p>Consider adding a serie using the button above</p>
            </Row>
          ) : (
            <SerieTable data={serieData} query={query} />
          )}
        </Container>
      </Row>
    </Container>
  );
};

export default Models;
