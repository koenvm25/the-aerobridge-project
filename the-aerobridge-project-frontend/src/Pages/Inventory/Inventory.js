import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import ReturnArrow from "../../Components/ReturnArrow";
import {
  deleteMasterComponent,
  getAllMasterComponents,
} from "../../Api/endpoints";
import Searchbar, { escapeHtml } from "../../Components/Searchbar";

const MasterComponents = (props) => {
  const [masterComponents, setMasterComponents] = useState([]);
  const [query, setQuery] = useState("");
  const searchKeys = ["name", "family", "earobridgeId"];

  useEffect(() => {
    getAllMasterComponents
      .then((response) => {
        setMasterComponents(response.data);
      })
      .catch((error) => {});
  }, []);

  // Method for getting results from searchbar
  const search = (data) => {
    return data.filter((item) =>
      searchKeys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  // Method for delete a certain master component
  const onDelete = (id) => {
    deleteMasterComponent(id);
    onChange(id);
  };

  // Method to trigger the page to reload, re-set the state
  const onChange = (id) => {
    const newData = [];
    for (let item of masterComponents) {
      if (item.masterComponentId !== id) {
        newData.push(item);
      }
    }
    setMasterComponents(newData);
  };

  // Loops through the stock from a master component and only shows the value of components with the status 'available'
  const setAvailableStock = (comp) => {
    const availableStock = [];
    for (var i = 0; i < comp.components.length; i++) {
      const componentsList = comp.components[i];
      if (componentsList.status === "Available") {
        availableStock.push(i);
      }
    }
    return availableStock.length;
  };

  return (
    <Container>
      <Row>
        <ReturnArrow to="/" name="Dashboard" />
      </Row>
      <Row>
        <h1>Inventory</h1>
      </Row>
      <Row>
        <Col>
          <Link to={"/master-component/create"}>
            <Button>Add new master component</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Searchbar
            name="master components"
            method={(e) => setQuery(escapeHtml(e.target.value.toLowerCase()))}
          />
        </Col>
      </Row>
      {masterComponents.length === 0 ? (
        <Row className="text-center">
          <h4>No data found</h4>
          <p>Consider adding a master component using the button above</p>
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
                <th>GTIN ID</th>
                <th>Family</th>
                <th>Name</th>
                <th>Available stock</th>
                <th>Total stock</th>
              </tr>
            </thead>
            {search(masterComponents).map((data) => (
              <tbody key={data.masterComponentId}>
                <tr key={data.masterComponentId}>
                  <td>{data.gtinId}</td>
                  <td>{data.family}</td>
                  <td>{data.name}</td>
                  <td>{setAvailableStock(data)}</td>
                  <td>{data.components.length}</td>
                  <td>
                    <Link to={`/master-component/${data.masterComponentId}`}>
                      <Button variant="primary">
                        <i className="bi bi-eye"></i>
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/master-component/edit/${data.masterComponentId}`}
                    >
                      <Button variant="warning">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(data.masterComponentId)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Row>
      )}
    </Container>
  );
};

export default MasterComponents;
