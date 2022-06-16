import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Row, Col, Button, Container } from "react-bootstrap";
import "../../App";
import ReturnArrow from "../../Components/ReturnArrow";
import { deleteAircraft, getAircrafts } from "../../Api/endpoints";
import Searchbar, { escapeHtml } from "../../Components/Searchbar";

const Aircrafts = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const [query, setQuery] = useState("");
  const searchKeys = ["name", "status", "category"];

  const search = (data) => {
    return data.filter((item) =>
      searchKeys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  useEffect(() => {
    getAircrafts.then((response) => {
      setAircrafts(response.data);
    });
  }, []);

  const getData = () => {
    getAircrafts
      .then((getAircrafts) => {
        setAircrafts(getAircrafts.data);
      })
      .catch((error) => {});
  };

  const onDelete = (aircraftId) => {
    deleteAircraft(aircraftId).then(() => {
      getData();
    });
  };

  return (
    <Container>
      <Row>
        <ReturnArrow to="/" name="Dashboard" />
      </Row>
      <Col className="mainFrame" />
      <Row>
        <h1>Aircrafts</h1>
      </Row>
      <Row>
        <Col>
          <Link to="/builds">
            <Button>Build aircraft</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Searchbar
            name="Aircrafts"
            method={(e) => setQuery(escapeHtml(e.target.value.toLowerCase()))}
          />
        </Col>
      </Row>
      <Row>
        {aircrafts.length === 0 ? (
          <Row className="text-center">
            <h4>No data found</h4>
            <p>Consider adding a serie using the button above</p>
          </Row>
        ) : (
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
                <th>AerobrigdeId</th>
                <th>name</th>
                <th>Serie</th>
                <th>category</th>
                <th>Status</th>
                <th>UpdatedAt</th>
                <th>CreatedAt</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {search(aircrafts).map((d) => (
                <tr key={d.aircraftId}>
                  <td>{d.aerobridgeId}</td>
                  <td>{d.name}</td>
                  <td>{d.serie.serie}</td>
                  <td>{d.category}</td>
                  <td>{d.status}</td>
                  <td>{d.createdAt}</td>
                  <td>{d.updatedAt}</td>
                  <td>
                    <Link to={`/aircraft/${d.aircraftId}`}>
                      <Button variant="primary">
                        <i className="bi bi-eye"></i>
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/aircraft/edit/${d.aircraftId}`}>
                      <Button variant="warning">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(d.aircraftId)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </Container>
  );
};

export default Aircrafts;
