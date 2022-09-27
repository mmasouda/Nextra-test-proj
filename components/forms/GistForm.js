import React, { useRef } from "react";
import { getSession } from "next-auth/react";

function GistForm() {
  const description = useRef();
  const filename = useRef();
  console.log(window.history.state.as);

  const gistFormChange = () => {
    const btn = document.getElementById("gistSubmit");
    if (description.current.value && filename.current.value) {
      btn.removeAttribute("disabled");
    } else {
      btn.setAttribute("disabled", null);
    }
  };

  const gistFormSubmit = async (e) => {
    e.preventDefault();
    const session = await getSession();
    const enteredDescription = description.current.value;
    const enteredFilename = filename.current.value;
    const reqBody = {
      description: enteredDescription,
      public: false,
      files: {
        file: { filename: enteredFilename, content: "file content" },
      },
    };
    const headers = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    };
    const req = await fetch(`https://api.github.com/gists`, headers);
    const res = await req.json();
    window.history.go(window.history.state.as);
    console.log(res);
  };
  return (
    <form
      className="gistForm"
      onChange={gistFormChange}
      onSubmit={gistFormSubmit}
    >
      <input type="text" placeholder="Gist description..." ref={description} />
      <input
        type="text"
        placeholder="Filename including extention..."
        ref={filename}
      />
      <button id="gistSubmit" type="submit" disabled>
        Create a gist
      </button>
    </form>
  );
}

export default GistForm;
