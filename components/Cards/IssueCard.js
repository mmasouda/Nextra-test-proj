import React from "react";

function IssueCard(props) {
  return (
    <>
      <div className="issueCard">
        <img src="/issue.svg" />
        {props.title}{" "}
        <div>
          {props.assignee} <img src={props.assigneePic} />
        </div>
      </div>
      <div className="issueBody">
        <div>Issue body</div>
        <p>{props.issueBody}</p>
      </div>
    </>
  );
}

export default IssueCard;
