import React from "react";

function SearchResCard(props) {
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
    <div className="searchResCard">
      <div>
        <img src="/repository.svg" />
        <span>{props.ownerName}</span> /<span>{props.repoName}</span>
      </div>
      <p>{props.description}</p>
      <div className="searchResLang">
        <span>Update on {dateFormatter}</span>
        <p>{props.codeLanguage}</p>
        <img src="/code-language.svg" />
      </div>
    </div>
  );
}

export default SearchResCard;
