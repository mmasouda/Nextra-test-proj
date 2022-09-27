import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

function Banner(props) {
  const router = useRouter();
  return (
    <header className="banner">
      <Image src="/gitHub-white.png" width={32} height={32} />
      <h6>Signed in as {props.username}</h6>
      <div className="user  ">
        <img src={props.userPic} />
        <button
          onClick={() => {
            router.push("/");
            signOut();
          }}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}

export default Banner;
