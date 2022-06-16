import React from "react";
import { OverlayTrigger, Popover, Figure } from "react-bootstrap";
import infoIcon from "../Assets/info-circle.svg"


const TooltipButton = (props) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Information</Popover.Header>
      <Popover.Body>
        On this website you can search for Aerobridge ID's.
        <br />
        To provide transparency, Aerobridge enables you to get detailed
        <br />
        information about a drone/component.
        <br />
        To verify an Aerobridge ID, simply type it inside of the search bar
        <br />
        on this page and click 'Search'.
      </Popover.Body>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
      <Figure>
            <Figure.Image
              alt=""
              src={infoIcon}
              width="25"
              height="25"
            />{' '}
          </Figure>
    </OverlayTrigger>
  );
};

export default TooltipButton;
