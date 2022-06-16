import { React, useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllModels } from "../../Api/endpoints";
import ReturnArrow from "../../Components/ReturnArrow";
import Searchbar, { escapeHtml } from "../../Components/Searchbar";
import ModelTable from "../../Components/Tables/ModelTable";

const Models = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllModels
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {});
  }, []);

  const onChange = (id) => {
    const newData = [];
    for (let item of data) {
      if (item.modelId !== id) {
        newData.push(item);
      }
    }
    setData(newData);
  };

  return (
    <Container>
      <Row>
        <ReturnArrow to="/" name="Dashboard" />
      </Row>
      <Row>
        <h1>Aircraft models</h1>
      </Row>
      <Row>
        <Col>
          <Link to="/models/create">
            <Button className="add-model-button">Add model</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Searchbar
            name="model"
            method={(e) => setQuery(escapeHtml(e.target.value.toLowerCase()))}
          />
        </Col>
      </Row>
      <Row className="text-center">
        {data.length === 0 ? (
          <>
            <Row>
              <h4>No data found</h4>
              <p>Consider adding a model using the button above</p>
            </Row>
          </>
        ) : (
          <Container>
            <ModelTable data={data} query={query} onDelete={onChange} />
          </Container>
        )}
      </Row>
    </Container>
  );
};

export default Models;
