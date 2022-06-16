import React from "react";
// import timelineData from './data'
import TimelineItem from "./TimelineItem";
import "./Timeline.css";

const Timeline = (props) =>
  props.data.length > 0 && (
    <div className="timeline-container-scroll">
        <p className="upper-p">Now</p>
      <div className="timeline-container"> 
        {props.data.map((data, idx) => (
          <TimelineItem data={data} key={idx} />
        ))}
      </div>
     <p className="lower-p">{props.data[props.data.length - 1].eventDate}</p>
    </div>
  );

export default Timeline;
