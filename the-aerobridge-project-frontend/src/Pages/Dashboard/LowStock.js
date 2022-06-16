import { Table } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import { React, useState, useEffect } from "react";
import { getLowStock } from "../../Api/endpoints";

const LowStock = () => {
  const [mastercomponents, setMastercomponents] = useState([]);

  useEffect(() => {
    getLowStock
      .then((response) => {
        setMastercomponents(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
  });

  return (
    <Container className="statusContainer">
      <Row>
        <h5 className="statusHeader">Low Stock</h5>
      </Row>
      <Row>
        <Table striped bordered hover className="statusTable" responsive="xs">
          {mastercomponents.length === 0 ? (
            <p>All components Available</p>
          ) : (
            <>
              <thead>
                <tr>
                  <th>Mastercomponent</th>
                  <th className="statusTableWidth">Amount</th>
                  <th>Minimal Stock</th>
                </tr>
              </thead>
              <tbody>
                {mastercomponents.map((d) => (
                  <tr key={d.mastercomponentId}>
                    <th>{d.name}</th>
                    <th>{d.availableStock}</th>
                    <th>{d.minimalStock}</th>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </Table>
      </Row>
    </Container>
  );
};
export default LowStock;
