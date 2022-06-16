import React from "react";
import { Container, Row, Table } from "react-bootstrap";

const PrivateAircraft = (props) => {
  return (
    <Container>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Aerobirdge ID</th>
            </tr>
          </thead>
          <tbody>
            {props.data.components.map((c) => (
                <tr key={c.name}>
                    <td>{c.name}</td>
                    <td><a href={`/search/${c.aerobridgeId}`}>{c.aerobridgeId}</a></td>
                </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default PrivateAircraft;
