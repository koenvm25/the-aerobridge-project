import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

export const escapeHtml = (unsafe) => {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
    .replaceAll(";", "");
};

const Searchbar = (props) => (
  <>
    <InputGroup className="mb-3">
      <FormControl
        type="text"
        placeholder={`Search for ${props.name}`}
        aria-label="Search models"
        aria-describedby="basic-addon2"
        onChange={props.method}
      />
    </InputGroup>
  </>
);

export default Searchbar;
