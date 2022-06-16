import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { deleteModel } from "../../Api/endpoints";

const ModelTable = (props) => {
  const tableRows = [
    "Name",
    "Popular Name",
    "Category",
    "Serie Count",
    "Created At",
    "Updated At",
    "View",
    "Edit",
    "Delete",
  ];
  const searchKeys = ["name", "popularName", "category"]; // Add an earobridgeId to searchKeys when a new aerobridgeId is generated

  const search = (data) => {
    return data.filter((item) =>
      searchKeys.some((key) => item[key].toLowerCase().includes(props.query))
    );
  };

  const onDelete = (modelId) => {
    deleteModel(modelId);
    props.onDelete(modelId);
  };

  return (
    <div>
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
            {tableRows.map((e) => (
              <th key={e}>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {search(props.data).map((d) => (
            <tr key={d.modelId}>
              <td>{d.name}</td>
              <td>{d.popularName}</td>
              <td>{d.category}</td>
              <td>{d.series.length}</td>
              <td>{d.createdAt}</td>
              <td>{d.updatedAt}</td>
              <td>
                <Link to={`/models/${d.modelId}`}>
                  <Button variant="primary">
                    <i className="bi bi-eye"></i>
                  </Button>
                </Link>
              </td>
              <td>
                <Link to={`/models/${d.modelId}/edit`}>
                  <Button variant="warning">
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </Link>
              </td>
              <td>
                <Button variant="danger" onClick={() => onDelete(d.modelId)}>
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

export default ModelTable;
