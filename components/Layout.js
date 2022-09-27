import React from "react";
import Banner from "./Banner";
import { useSession } from "next-auth/react";

function Layout(props) {
  const { data: session } = useSession();
  return (
    <>
      <Banner userPic={session.user.image} username={session.user.name} />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
