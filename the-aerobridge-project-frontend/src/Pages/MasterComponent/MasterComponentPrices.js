import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Table } from "react-bootstrap";

const MasterComponentPrices = (props) => {
  return (
    <Container className="mastercomponentprices-container-1">
      <Row>
        <Col>
          <h3>{props.data.name}</h3>
        </Col>
      </Row>
      <Row className="mastercomponentprices-row-2">
        <Col>
          <h5>Favorite supplier</h5>
        </Col>
      </Row>
      <Row className="mastercomponentprices-row-1">
        <Table
          striped
          bordered
          hover
          size="sm"
          className="text-center"
          responsive="xs"
        >
          <thead>
            <tr>
              <th className="mastercomponentprices-th-1">Supplier</th>
              <th className="mastercomponentprices-th-3">Current Price</th>
              <th className="mastercomponentprices-th-2">Last updated at</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.data.source}</td>
              <td>€{props.data.latestPrice}</td>
              <td>
                {props.date} @ {props.time} GMT{" "}
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row className="mastercomponentprices-row-2">
        <Col>
          <h5>All suppliers</h5>
        </Col>
      </Row>
      <Row className="mastercomponentprices-row-1">
        <Table
          striped
          bordered
          hover
          size="sm"
          className="text-center"
          responsive="xs"
        >
          <thead>
            <tr>
              <th className="mastercomponentprices-th-1">Supplier</th>
              <th className="mastercomponentprices-th-3">Current Price</th>
              <th className="mastercomponentprices-th-2">Last updated at</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.data.source}</td>
              <td>€{props.data.latestPrice}</td>
              <td>
                {props.date} @ {props.time} GMT{" "}
              </td>
            </tr>
            <tr>
              <td>Amazon</td>
              <td>€23,99</td>
              <td>2022-05-01 @ 12:00 GMT</td>
            </tr>
            <tr>
              <td>Bol.com</td>
              <td>€26,99</td>
              <td>2022-05-01 @ 12:00 GMT</td>
            </tr>
            <tr>
              <td>E-bay</td>
              <td>€29,99</td>
              <td>2022-05-01 @ 12:00 GMT</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default MasterComponentPrices;
