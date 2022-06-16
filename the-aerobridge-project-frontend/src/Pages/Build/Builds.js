import { React, useState, useEffect } from "react";
import { Table, Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReturnArrow from "../../Components/ReturnArrow";
import { getAllModels } from "../../Api/endpoints";
import Searchbar, { escapeHtml } from "../../Components/Searchbar";

const Builds = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const tableRows = [
    "Name",
    "Popular Name",
    "Category",
    "Serie Count",
    "Created At",
    "Updated At",
    "Build",
  ];
  const searchKeys = ["name", "popularName", "category"];

  const search = (data) => {
    return data.filter((item) =>
      searchKeys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  useEffect(() => {
    getAllModels
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {});
  }, []);

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
            name="Model"
            method={(e) => setQuery(escapeHtml(e.target.value.toLowerCase()))}
          ></Searchbar>
        </Col>
      </Row>
      {data.length === 0 ? (
        <Row className="text-center">
          <h4>No data found</h4>
          <p>Consider adding a model using the button above</p>
        </Row>
      ) : (
        <Row>
          <Table
            striped
            bordered
            hover
            className="text-center"
            size="sm"
            responsive="xs"
          >
            <thead>
              <tr>
                {tableRows.map((e) => (
                  <th>{e}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {search(data).map((d) => (
                <tr key={d.modelId}>
                  <td>{d.name}</td>
                  <td>{d.popularName}</td>
                  <td>{d.category}</td>
                  <td>{d.series.length}</td>
                  <td>{d.createdAt}</td>
                  <td>{d.updatedAt}</td>
                  <td>
                    <Link to={`/models/${d.modelId}`}>
                      <Button variant="success">
                        <i className="bi bi-tools"></i>
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      )}
    </Container>
  );
};

export default Builds;
