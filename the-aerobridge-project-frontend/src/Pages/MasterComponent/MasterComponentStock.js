import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import {
  getByMasterComponentId,
  getMasterComponent,
  updateMinimalStock,
} from "../../Api/endpoints";
import StockTable from "../../Components/Tables/StockTable";

const MasterComponentStock = () => {
  const [components, setComponents] = useState([]);
  const [masterComponent, setMasterComponent] = useState([]);
  const [show, setShow] = useState(false);
  const [minimalStock, setMinimalStock] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let params = useParams();

  const handleUpdate = () => {
    updateMinimalStock(params.id, minimalStock)
      .then(handleClose())
      .catch(function (error) {});
  };

  useEffect(() => {
    getMasterComponent(params.id).then((response) => {
      setMasterComponent(response.data);
      setMinimalStock(response.data.minimalStock);
    });
    getByMasterComponentId(params.id)
      .then((response) => {
        setComponents(response.data);
      })
      .catch((error) => {});
  }, [params.id]);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h3>{masterComponent.name}</h3>
        </Col>
        <Col md={{ span: 6, offset: 0 }}>
          <Link to={`/master-component/${params.id}/add-stock`}>
            <Button className="me-2" variant="success">
              Add stock
            </Button>
          </Link>
          <Button className="me-2" variant="primary" onClick={handleShow}>
            Set minimal stock
          </Button>
          <Link to={"/inventory"}>
            <Button variant="secondary">Back</Button>
          </Link>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit minimal stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Minimal stock:{" "}
              <input
                type="number"
                className="quantity-input"
                placeholder={minimalStock}
                onChange={(e) => {
                  setMinimalStock(e.target.value);
                }}
              ></input>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Row className="mb-3">
        <Tab.Container id="left-tabs-example" defaultActiveKey="Overview">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="Overview">Overview</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Available">Available</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Ordered">Ordered</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="In Transit">In Transit</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="In Assembly">In Assembly</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Assembled">Assembled</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Broken">Broken</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="Overview">
                  <StockTable type="overview" data={components} />
                </Tab.Pane>
                <Tab.Pane eventKey="Available">
                  <StockTable
                    data={components}
                    status="Available"
                    edit={true}
                    location={true}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="Ordered">
                  <StockTable data={components} status="Ordered" edit={true} />
                </Tab.Pane>
                <Tab.Pane eventKey="In Transit">
                  <StockTable
                    data={components}
                    status="In Transit"
                    edit={true}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="In Assembly">
                  <StockTable
                    data={components}
                    status="In Assembly"
                    aircraft={true}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="Assembled">
                  <StockTable
                    data={components}
                    status="Assembled"
                    aircraft={true}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="Broken">
                  <StockTable data={components} status="Broken" />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Row>
    </Container>
  );
};

export default MasterComponentStock;
