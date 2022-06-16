import { React } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const StockTable = (props) => {
  console.log(props);
  const data = props.data;

  const count = (input) => {
    const filteredArray = [];
    for (var i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.status === input) {
        filteredArray.push(i);
      }
    }
    return filteredArray.length;
  };

  let params = useParams();

  if (props.type === "overview") {
    return (
      <>
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
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Available</td>
              <td>{count("Available")}</td>
            </tr>
            <tr>
              <td>Ordered</td>
              <td>{count("Ordered")}</td>
            </tr>
            <tr>
              <td>In Transit</td>
              <td>{count("In Transit")}</td>
            </tr>
            <tr>
              <td>In Assembly</td>
              <td>{count("In Assembly")}</td>
            </tr>
            <tr>
              <td>Assembled</td>
              <td>{count("Assembled")}</td>
            </tr>
            <tr>
              <td>Broken</td>
              <td>{count("Broken")}</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  } else {
    return (
      <Table
        status={props.status}
        edit={props.edit}
        striped
        bordered
        hover
        size="sm"
        className="text-center"
        responsive="xs"
      >
        <thead>
          <tr>
            <th>Aerobridge ID</th>
            {props.location === true ? <th>Location</th> : null}
            {props.edit === true ? <th>Edit</th> : null}
            {props.aircraft === true ? <th>Aircraft</th> : null}
          </tr>
        </thead>
        <tbody>
          {data.filter((obj) => {
            return obj.status === props.status;
          }).length === 0 ? (
            <tr>No components with this status</tr>
          ) : (
            data
              .filter((obj) => {
                return obj.status === props.status;
              })
              .map((data) => (
                <tr>
                  <td>{data.aerobridgeId}</td>
                  {props.location === true ? <th>{data.location}</th> : null}
                  {props.edit === true ? (
                    <td>
                      <Link
                        to={`/master-component/${params.id}/edit-stock/${data.componentId}`}
                        state={{ from: props.location }}
                      >
                        <Button variant="warning">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </Link>
                    </td>
                  ) : null}
                  {props.aircraft === true ? (
                    <th>{data.aircraft.aerobridgeId}</th>
                  ) : null}
                </tr>
              ))
          )}
        </tbody>
      </Table>
    );
  }
};

export default StockTable;
