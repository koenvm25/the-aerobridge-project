import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function CancelWarning(link) {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Are you sure?</Alert.Heading>
        <p>All your progress will be lost.</p>
        <Link to={link}>
          <Button className="cl-btn" variant="outline-danger">
            {" "}
            Yes
          </Button>
        </Link>
        <Button
          className="cl-btn"
          variant="outline-danger"
          onClick={() => setShow(false)}
        >
          No
        </Button>
      </Alert>
    );
  }
  if (!show) {
    return (
      <Button
        className="cl-btn"
        variant="outline-danger"
        onClick={() => setShow(true)}
      >
        Cancel
      </Button>
    );
  }
}
