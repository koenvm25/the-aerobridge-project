import React, { useState, useEffect } from "react";
import { Row, Container, Button, Table, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  editSerieMasterComponents,
  getAllMasterComponents,
  getSerieMasterComponents,
} from "../../Api/endpoints";
import Searchbar from "../../Components/Searchbar";

const EditMasterComponents = () => {
  const [data, setData] = useState([]);
  const [masterComponents, setMasterComponents] = useState([]);
  const [setRefresh] = useState([]);
  const [onlyOnce, setOnlyOnce] = useState(0);
  const [query, setQuery] = useState("");
  const searchKeys = ["name", "family"]; // Add an earobridgeId to searchKeys when a new aerobridgeId is generated

  const search = (data) => {
    return data.filter((item) =>
      searchKeys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  const refreshComponent = () => {
    // re-renders the component
    setRefresh({});
  };

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    getAllMasterComponents
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {});
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const masterComponentsFromSerie = (data) => {
    for (var i = 0; i < data.length; i++) {
      const serieMasterComp = data[i];
      serieMasterComp.masterComponent.quantity = serieMasterComp.quantity;
      setMasterComponents((state) => [
        ...state,
        serieMasterComp.masterComponent,
      ]);
    }
  };

  useEffect(() => {
    getSerieMasterComponents(params.serieId)
      .then((response) => {
        if (onlyOnce === 0) {
          setOnlyOnce(1);
          masterComponentsFromSerie(response.data);
        }
      })
      .catch((error) => {});
  }, [masterComponentsFromSerie, onlyOnce, params.serieId]);

  const addQuantity = (id, quantity) => {
    for (var i = 0; i < masterComponents.length; i++) {
      const masterComp = masterComponents[i];
      if (masterComp.masterComponentId === id) {
        masterComp.quantity = quantity;
        break;
      }
    }
  };

  const removeComponent = (id) => {
    for (var i = 0; i < masterComponents.length; i++) {
      const masterComp = masterComponents[i];
      if (masterComp.masterComponentId === id) {
        masterComponents.splice(i, 1);
      }
    }
    refreshComponent();
  };

  const handlePost = () => {
    editSerieMasterComponents(params.serieId, masterComponents)
      .then(function (response) {
        navigate(`/models/${params.modelId}/serie/${params.serieId}`);
      })
      .catch(function (error) {});
  };

  return (
    <>
      <Container>
        <Row>
          <h2>Edit a serie</h2>
        </Row>
        <Row>
          <p>Edit master components</p>
        </Row>
        <Row>
          <Col md={6} sm={6} xs={6}>
            <Searchbar
              name="master components"
              method={(e) => setQuery(e.target.value.toLowerCase())}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              striped
              bordered
              hover
              className="text-center"
              responsive="xs"
            >
              <thead>
                <tr>
                  <th>Family</th>
                  <th>Name</th>
                  <th>Add</th>
                </tr>
              </thead>
              <tbody>
                {search(data).map((d) => (
                  <tr key={d.id}>
                    <td>{d.family}</td>
                    <td>{d.name}</td>
                    <td>
                      <Button
                        onClick={() =>
                          setMasterComponents((state) => [...state, d])
                        }
                        variant="link"
                        className="bi bi-plus-square-fill"
                      ></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Your summary</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {masterComponents.map((d) => (
                  <tr key={d.masterComponentId}>
                    <td>{d.name}</td>
                    <td>
                      <input
                        type="number"
                        className="quantity-input"
                        placeholder={d.quantity}
                        onChange={(e) => {
                          addQuantity(d.masterComponentId, e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        onClick={() => removeComponent(d.masterComponentId)}
                        variant="link"
                        className="bi bi-trash"
                      ></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tbody>
                <tr>
                  <td>Total: {masterComponents.length}</td>
                </tr>
              </tbody>
            </Table>
            <Row>
              <Col>
                <Button onClick={handlePost} variant="primary" type="button">
                  Save
                </Button>
                {/* Cancel warning still need to be implemented here */}
                <Button
                  onClick={() =>
                    navigate(
                      `/models/${params.modelId}/serie/${params.serieId}`
                    )
                  }
                  variant="danger"
                  className="cl-btn"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditMasterComponents;
