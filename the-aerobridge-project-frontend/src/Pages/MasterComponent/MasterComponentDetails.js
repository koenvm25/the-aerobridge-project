import React from "react";
import { Row, Col, Table } from "react-bootstrap";

const MasterComponentDetails = (props) => {
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 0.7,
      }}
    />
  );

  return (
    <Row>
      <Col sm={7} className="mb-5">
        <img
          src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
          alt="new"
          height="250px"
          width="250px"
          size="50%"
        />
      </Col>
      <Col sm={5}>
        <h1 class="font-weight-light">{props.data.name}</h1>
        <p>
          this is a {props.data.name} you can use this product as a{" "}
          {props.data.family} for your aircraft.
        </p>
        <p>
          Created on {props.data.createdAt}
          <br />
          Updated on {props.data.updatedAt}
        </p>
        {/* <Button>
            See lowest price
          </Button> */}
      </Col>
      <ColoredLine color="black" />
      <Row>
        <Col>
          <Table
            striped
            bordered
            hover
            text-center
            className="text-center"
            size="sm"
            responsive="xs"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Family</th>
                <th>GTIN Id</th>
              </tr>
            </thead>
            <tbody>
              <td>{props.data.name}</td>
              <td>{props.data.family}</td>
              <td>{props.data.gtinId}</td>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Row>
  );
};

export default MasterComponentDetails;
