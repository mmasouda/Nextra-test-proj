import React from "react";

function GistCard(props) {
  const fileName = Object.keys(props.fileName)[0];
  return (
    <div className="gistCard">
      <div className="header">
        <img src={props.src} />
        {fileName}
        <span>{props.public ? "Public" : "Secret"}</span>
        <h6>{props.description}</h6>
      </div>
    </div>
  );
}

export default GistCard;
