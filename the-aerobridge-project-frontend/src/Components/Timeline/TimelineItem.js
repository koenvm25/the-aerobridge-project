import React from "react";
import "./TimelineItem.css";

export const handleStatusColor = (status) => {
  if (status === "Available") {
    return "#028F68";
  } else if (status === "Broken") {
    return "#fc0303";
  } else if (status === "In Assembly") {
    return "#F4CF3F";
  } else if (status === "Assembled") {
    return "#021bfa";
  } else if (status === "In Transit") {
    return "#26524a";
  } else if (status === "Ordered") {
    return "#c7c7c7";
  }
};

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <span
        className="tag"
        style={{ background: handleStatusColor(data.status) }}
      >
        {data.status}
      </span>
      <time>{data.eventDate}</time>
      <p>
        {data.description}{" "}
        <a href={`/search/${data.aircraftAID}`}>{data.aircraftAID}</a>
      </p>

      <span className="circle"></span>
    </div>
  </div>
);

export default TimelineItem;
