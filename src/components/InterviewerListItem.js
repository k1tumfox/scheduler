import React from "react";
import "components/InterviewerListItem.scss"; 
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const intClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
    // "interviewers__item-image": props.avatar
  });

  return(
    <li className={intClass} onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ""}
    </li>
  );
}