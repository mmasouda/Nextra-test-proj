import React from "react";
import IssueCard from "../Cards/IssueCard";
import IssueForm from "../forms/IssueForm";

function Issues({ props }) {
  return (
    <>
      <IssueForm />
      <div className="issuesContainer">
        <div className="header">
          <img src="/issue.svg" />
          {props.issues.length} Issues available
          <span>Assignee</span>
        </div>
        {props.issues.map((el) => (
          <IssueCard
            key={el.id}
            title={el.title}
            assignee={el.assignee.login}
            assigneePic={el.assignee.avatar_url}
            issueBody={el.body}
          />
        ))}
      </div>
    </>
  );
}

export default Issues;
