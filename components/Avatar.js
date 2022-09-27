import React from "react";

function Avatar(props) {
  return (
    <aside>
      <div className="avatar">
        <img src={props.userPic} />
        <p>{props.username}</p>
        <p>
          <img src="/followers.svg" className="icon" /> followers{" "}
          <b>{props.followers}</b> .{" "}
          <img src="/following.svg" className="icon" /> following{" "}
          <b>{props.following}</b>
        </p>
      </div>
    </aside>
  );
}

export default Avatar;
