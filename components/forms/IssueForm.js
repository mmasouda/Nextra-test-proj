import React, { useRef } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

function IssueForm() {
  const title = useRef();
  const body = useRef();
  const router = useRouter();

  const formChange = () => {
    const btn = document.getElementById("submitBtn");
    if (title.current.value && body.current.value) {
      btn.removeAttribute("disabled");
    } else {
      btn.setAttribute("disabled", null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const session = await getSession();
    const user = router.query.user;
    const repo = router.query.repo;
    const enteredTitle = title.current.value;
    const enteredBody = body.current.value;
    const reqBody = {
      title: enteredTitle,
      body: enteredBody,
      assignee: user,
    };
    const headers = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${session.accessToken}`,
      },
    };
    const req = await fetch(
      `https://api.github.com/repos/${user}/${repo}/issues`,
      headers
    );
    const res = await req.json();
    window.history.go(window.history.state.as);
    console.log(res);
  };
  return (
    <form className="issueForm" onChange={formChange} onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" ref={title} />
      <textarea placeholder="Leave a comment" ref={body} />
      <span>
        <button id="submitBtn" type="submit" disabled>
          Submit new issue
        </button>
      </span>
    </form>
  );
}

export default IssueForm;
