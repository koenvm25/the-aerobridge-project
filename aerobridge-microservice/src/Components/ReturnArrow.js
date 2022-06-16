import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/arrow.svg";


const ReturnArrow = (props) => {
  let navigate = useNavigate();
  return (
    <Container>
          <img
            src={logo}
            width="20" 
            height="20"
            onClick={() => navigate(props.to)}
          ></img>{` Return to ${props.name}`}     
    </Container>
  );
};

export default ReturnArrow;
