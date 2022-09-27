import React from "react";
import Layout from "../../../components/Layout";
import Avatar from "../../../components/Avatar";
import GistCard from "../../../components/Cards/GistCard";
import GistForm from "../../../components/forms/GistForm";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

function Gists(props) {
  const { data: session } = useSession();
  if (session) {
    return (
      <Layout>
        <Avatar
          userPic={session.user.image}
          username={session.user.name}
          followers={props.followers.length}
          following={props.following.length}
        />
        <div className="gist">
          <div className="gistHeader">
            <span>
              <img src="/repository.svg" />
              <a href={`/${session.user.name}`}>Repositories</a>
            </span>
            <span>
              <img src="/gist.svg" />
              <a>Your gists</a>
            </span>
          </div>
          <div>
            <GistForm />
            {props.gists.map((el) => (
              <GistCard
                key={el.node_id}
                src={session.user.image}
                fileName={el.files}
                public={el.public}
                description={el.description}
              />
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Gists;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    const headers = {
      method: "GET",
      headers: {
        Authorization: `Token ${session.accessToken}`,
      },
    };
    const [gistsRes, followersRes, followingRes] = await Promise.all([
      fetch(`https://api.github.com/gists`, headers),
      fetch(`https://api.github.com/user/followers`, headers),
      fetch(`https://api.github.com/user/following`, headers),
    ]);
    const [gists, followers, following] = await Promise.all([
      gistsRes.json(),
      followersRes.json(),
      followingRes.json(),
    ]);
    return { props: { gists, followers, following } };
  } else {
    return { props: {} };
  }
}
