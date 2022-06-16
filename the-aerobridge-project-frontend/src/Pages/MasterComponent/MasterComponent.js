import { Container, Tab, Tabs } from "react-bootstrap";
import MasterComponentDetails from "./MasterComponentDetails";
import MasterComponentPrices from "./MasterComponentPrices";
import MasterComponentStock from "./MasterComponentStock";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ReturnArrow from "../../Components/ReturnArrow";
import { getMasterComponent } from "../../Api/endpoints";

const MasterComponent = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);

  let params = useParams();

  useEffect(() => {
    getMasterComponent(params.id)
      .then((response) => {
        setData(response.data);
        setDate(response.data.priceUpdatedAt.slice(0, 10));
        setTime(response.data.priceUpdatedAt.slice(11, 16));
      })
      .catch((error) => {});
  }, [params.id]);

  return (
    <Container>
      <Row>
        <ReturnArrow to="/inventory" name="Inventory" />
      </Row>
      <Tabs
        defaultActiveKey="details"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="stock" title="Stock">
          <MasterComponentStock data={data} />
        </Tab>
        <Tab eventKey="details" title="Details">
          <MasterComponentDetails data={data} />
        </Tab>
        <Tab eventKey="price" title="Current Price">
          <MasterComponentPrices data={data} date={date} time={time} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MasterComponent;
