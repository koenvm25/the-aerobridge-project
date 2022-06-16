import { Table } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import { React, useState, useEffect } from "react";
import { getAircrafts } from "../../Api/endpoints";

export const handleStatusColor = (status) => {
  if (status === "Available") {
    console.log("available");
    return "available";
  } else if (status === "Broken") {
    console.log("broken");
    return "broken";
  } else {
    console.log("assembled");
    return "assembled";
  }
};

const AircraftStatus = () => {
  const [aircrafts, setAircrafts] = useState([]);

  useEffect(() => {
    getAircrafts
      .then((response) => {
        console.log(response.data);
        setAircrafts(response.data);
      })
      .catch((error) => {});
  });

  return (
    <Container className="statusContainer">
      <Row>
        <h5 className="statusHeader">Aircraft Status</h5>
      </Row>
      <Row>
        {aircrafts.length === 0 ? (
          <>
            <p>There are 0 aircrafts in your fleet</p>
          </>
        ) : (
          <Table striped bordered hover className="statusTable" responsive="xs">
            <thead>
              <tr>
                <th>Aircraft Name</th>
                <th className="statusTableWidth">Status</th>
              </tr>
            </thead>
            <tbody>
              {aircrafts.map((d) => (
                <tr key={d.aricraftId}>
                  <td>{d.name}</td>
                  <td className="text-center">
                    <span class={handleStatusColor(d.status)}></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
      <Row>
        <p>
          {<span class="available-Small"></span>} Available
          {<span class="broken-Small"></span>} Broken
          {<span class="assembled-Small"></span>} In Assembly
          {<span class="inTransit-Small"></span>} In Transit
        </p>
      </Row>
    </Container>
  );
};

export default AircraftStatus;
