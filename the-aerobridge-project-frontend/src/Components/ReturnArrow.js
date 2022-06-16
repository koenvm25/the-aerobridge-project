import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ReturnArrow = (props) => {
  let navigate = useNavigate();
  return (
    <Container>
      <i
        className="bi bi-arrow-left-square-fill"
        onClick={() => navigate(props.to)}
      ></i>
      {` Return to ${props.name}`}
    </Container>
  );
};

export default ReturnArrow;
