import React, { useState, useEffect } from "react";
import {
  Row,
  Container,
  Button,
  ProgressBar,
  Table,
  Col,
  Alert,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAllMasterComponents,
  deleteSerie,
  postSerieMasterComponents,
} from "../../Api/endpoints";
import Searchbar from "../../Components/Searchbar";

const AddMasterComponent = () => {
  const [masterComponents, setMasterComponents] = useState([]);
  const [addedMasterComponents, setAddedMasterComponents] = useState([]);
  const [query, setQuery] = useState("");
  const [setRefresh] = useState([]);
  const searchKeys = ["name", "family"]; // add an aerobridgeId to searchKeys when a new aerobrigdeId is generated

  const search = (data) => {
    return data.filter((item) =>
      searchKeys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  const [show, setShow] = useState(false);

  const CancelWarning = () => {
    if (show) {
      return (
        <Alert variant="danger">
          <Alert.Heading>Are you sure?</Alert.Heading>
          <p>All your progress will be lost.</p>
          <Button
            className="cl-btn"
            variant="outline-danger"
            onClick={() => onDelete(params.serieId)}
          >
            {" "}
            Yes
          </Button>
          <Button
            className="cl-btn"
            variant="outline-danger"
            onClick={() => setShow(false)}
          >
            No
          </Button>
        </Alert>
      );
    } else if (!show) {
      return (
        <Button
          className="cl-btn"
          variant="outline-danger"
          onClick={() => setShow(true)}
        >
          Cancel
        </Button>
      );
    }
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
        setMasterComponents(response.data);
      })
      .catch((error) => {});
  }, []);

  const addQuantity = (id, quantity) => {
    for (var i = 0; i < addedMasterComponents.length; i++) {
      const masterComp = addedMasterComponents[i];
      if (masterComp.masterComponentId === id) {
        masterComp.quantity = quantity;
        break;
      }
    }
  };

  const removeComponent = (id) => {
    for (var i = 0; i < addedMasterComponents.length; i++) {
      const masterComp = addedMasterComponents[i];
      if (masterComp.masterComponentId === id) {
        addedMasterComponents.splice(i, 1);
      }
    }
    refreshComponent();
  };

  const onDelete = (id) => {
    deleteSerie(id)
      .then(() => {
        navigate(`/models/${params.modelId}`);
      })
      .catch((error) => {});
  };

  const handlePost = () => {
    postSerieMasterComponents(params.serieId, addedMasterComponents)
      .then(function () {
        navigate(`/models/${params.modelId}/serie/${params.serieId}`);
      })
      .catch(function (error) {});
  };

  return (
    <>
      <Container>
        <Row>
          <h2>Create a new serie</h2>
        </Row>
        <Row>
          <ProgressBar animated now="100" label="Step 2/2" />
        </Row>
        <Row>
          <p>Step 2: Adding master components</p>
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
                {search(masterComponents).map((d) => (
                  <tr key={d.masterComponentId}>
                    <td>{d.family}</td>
                    <td>{d.name}</td>
                    <td>
                      <Button
                        onClick={() =>
                          setAddedMasterComponents((state) => [...state, d])
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
                {addedMasterComponents.map((d) => (
                  <tr key={d.masterComponentId}>
                    <td>{d.name}</td>
                    <td>
                      <input
                        type="number"
                        className="quantity-input"
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
                  <td>Total: {addedMasterComponents.length}</td>
                </tr>
              </tbody>
            </Table>
            <Row>
              <Col>
                <Button onClick={handlePost} variant="primary" type="button">
                  Save
                </Button>
                {CancelWarning()}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddMasterComponent;
