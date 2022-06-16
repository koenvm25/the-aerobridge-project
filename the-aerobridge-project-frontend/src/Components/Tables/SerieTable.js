import React from "react";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { deleteSerie } from "../../Api/endpoints";

const SerieTable = (props) => {
  const tableRows = [
    "Serie",
    "Master Components",
    "Created At",
    "Updated At",
    "View",
    "Build",
    "Delete",
  ];
  const searchKeys = ["serie"]; //aerobridgeId toevoegen aan searchKeys zodra iedere serie een AerobridgeId gegenereerd krijgt

  const search = (data) => {
    return data.filter((item) =>
      searchKeys.some((key) => item[key].toLowerCase().includes(props.query))
    );
  };

  const handleDelete = (serieId) => {
    deleteSerie(serieId);
  };

  let params = useParams();

  return (
    <div>
      <Table striped bordered hover className="text-center" responsive="xs">
        <thead>
          <tr>
            {tableRows.map((e) => (
              <th key={e}>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {search(props.data).map((d) => (
            <tr key={d.serieId}>
              <td>{d.serie}</td>
              <td>{d.masterComponents.length}</td>
              <td>{d.createdAt}</td>
              <td>{d.updatedAt}</td>
              <td>
                <Link to={`/models/${params.modelId}/serie/${d.serieId}`}>
                  <Button variant="primary">
                    <i className="bi bi-eye"></i>
                  </Button>
                </Link>
              </td>
              <td>
                <Link to={`/Buildinfo/${params.modelId}/serie/${d.serieId}`}>
                  <Button variant="success">
                    <i className="bi bi-tools"></i>
                  </Button>
                </Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(d.serieId)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SerieTable;
