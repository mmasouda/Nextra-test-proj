import React from "react";

function RepoCard(props) {
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
    months[parseInt(props.updatedOn.substring(6, 7))]
  } ${props.updatedOn.substring(8, 10)}, ${props.updatedOn.substring(0, 4)}`;
  return (
    <div className="repoCard">
      <div>
        <a href={`/${props.href}`}>{props.name}</a>
        <span>{props.private ? "Private" : "Public"}</span>
      </div>
      <p>{props.forked ? "Forked project" : null}</p>
      <p>{props.description}</p>
      <p>
        Updated on {dateFormatter}
        <span>
          <img src={props.language ? "/code-language.svg" : null} />
          {props.language}
          <img src="/code-fork.svg" />
          {props.forks_count}
          <img src="/watchers.svg" />
          {props.watchers_count}
        </span>
      </p>
    </div>
  );
}

export default RepoCard;
