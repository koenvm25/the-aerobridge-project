import { React, useState, useEffect } from "react";
import {
  getAircraft,
  updateAircraft,
  updateAircraftComponents,
} from "../../Api/endpoints";
import {
  Row,
  Container,
  Button,
  Table,
  FormGroup,
  Form,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ReturnArrow from "../../Components/ReturnArrow";
import NewComponentsLocation from "./NewComponentsLocation";

const EditAircraft = () => {
  const [data, setData] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);
  const [status, setStatus] = useState("");
  const [components, setComponents] = useState([]);
  const swappedComponents = [];
  const [onlyOnce, setOnlyOnce] = useState(0);

  let params = useParams();
  let navigate = useNavigate();

  const handleSwap = (id, checked) => {
    console.log("swap test for " + id);
    if (checked) {
      swappedComponents.push(id);
    } else if (!checked) {
      swappedComponents.splice(swappedComponents.indexOf(id), 1);
    }
    console.log(swappedComponents);
  };

  const handleSubmit = () => {
    updateAircraft(params.aircraftId, status);
    updateAircraftComponents(params.aircraftId, swappedComponents)
      .then((response) => {
        if (response.data.length === 0) {
          navigate(`/aircrafts`);
          navigate(0);
        } else {
          setApiResponse(response.data);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAircraft(params.aircraftId)
      .then((response) => {
        if (onlyOnce === 0) {
          setOnlyOnce(1);
          setData(response.data);
          setComponents(response.data.components);
        }
      })
      .catch((error) => {});
  }, [onlyOnce, params.aircraftId]);

  if (apiResponse.length === 0) {
    return (
      <Container>
        <Row>
          <ReturnArrow to={`/aircrafts`} name="Aircrafts" />
        </Row>
        <Row className="mb-3">
          <FormGroup>
            <Form.Label>Select new aircraft status</Form.Label>
            <Form.Control
              as="select"
              placeholder={data.status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option>Select status</option>
              <option value="Available">Available</option>
              <option value="In Assembly">In Assembly</option>
              <option value="Broken">Broken</option>
            </Form.Control>
          </FormGroup>
        </Row>
        <Row>
          <Table
            striped
            bordered
            hover
            className="text-center"
            size="sm"
            responsive="xs"
          >
            <thead>
              <tr>
                <th>Aerobridge ID</th>
                <th>Component</th>
                <th>Replace</th>
              </tr>
            </thead>
            <tbody>
              {components.map((d) => (
                <tr>
                  <td>{d.aerobridgeId}</td>
                  <td>{d.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        handleSwap(d.componentId, e.currentTarget.checked)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <Button onClick={(e) => handleSubmit()}>Submit</Button>
      </Container>
    );
  } else {
    return <NewComponentsLocation data={apiResponse} />;
  }
};

export default EditAircraft;
