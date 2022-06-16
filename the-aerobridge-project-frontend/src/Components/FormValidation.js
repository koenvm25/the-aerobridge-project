import React, { useState } from "react";
import { Form } from "react-bootstrap";

export const FormValidation = ({ children }, setFunction) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === true) {
      setFunction();
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {children}
    </Form>
  );
};
