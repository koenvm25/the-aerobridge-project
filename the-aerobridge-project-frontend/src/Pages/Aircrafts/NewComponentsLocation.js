import React from "react";
import { Container, Table, Row } from "react-bootstrap";
import ReturnArrow from "../../Components/ReturnArrow";
import ScrollToTop from "../../Components/ScrollToTop";

const NewComponentsLocation = (props) => {
  return (
    <Container>
      <ScrollToTop />
      <Row>
        <ReturnArrow to={`/aircrafts`} name="Aircrafts" />
      </Row>
      <Row className="mb-3">
        <h2>
          New components of Aircraft {props.data[0].aircraft.aerobridgeId}
        </h2>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Aerobridge ID</th>
              <th>Component</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((d) => (
              <tr key={d.aerobridgeId}>
                <td>{d.aerobridgeId}</td>
                <td>{d.name}</td>
                <td>{d.location}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default NewComponentsLocation;
