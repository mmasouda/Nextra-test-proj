import React from "react";

function RepoContent(props) {
  console.log(props);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateFormatter = `${
    months[parseInt(props.createdOn.substring(6, 7))]
  } ${props.createdOn.substring(8, 10)}, ${props.createdOn.substring(0, 4)}`;
  return (
    <div className="repoContentContainer">
      <div className="repoContent">
        <div className="header">
          <img src="/code-branch.svg" />
          <p>
            {props.branch}
            <span>Created on: {dateFormatter}</span>
          </p>
        </div>
        {props.content.message
          ? null
          : props.content.map((el) => (
              <div key={el.sha} className="contentEl">
                <img src={el.type === "file" ? "/gist.svg" : "/folder.svg"} />
                {el.name}
              </div>
            ))}
      </div>
      <div className="repoAbout">
        <h5>About</h5>
        <div>{props.description}</div>
        <div>
          <img src="/code-fork.svg" />
          {props.forksCount}
        </div>
        <div>
          <img src="/watchers.svg" />
          {props.watchersCount}
        </div>
      </div>
    </div>
  );
}

export default RepoContent;
