import React from "react";
import Layout from "../../components/Layout";
import Avatar from "../../components/Avatar";
import Link from "next/link";
import RepoCard from "../../components/Cards/RepoCard";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Dashboard(props) {
  const { data: session } = useSession();
  const router = useRouter();
  const searchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = document
      .querySelector(".repoSearch input")
      .value.replace(" ", "+");
    router.push(`/${session.user.name}/search/${searchQuery}`);
  };
  if (session) {
    return (
      <>
        <Layout>
          <>
            <Avatar
              userPic={session.user.image}
              username={session.user.name}
              followers={props.followers.length}
              following={props.following.length}
            />
            <div className="repo">
              <div className="navigation">
                <h3>
                  <img src="/repository.svg" className="navigationIcon" />{" "}
                  Repositories <span>{props.repos.length}</span>
                </h3>
                <img src="/gist.svg" className="navigationIcon" />
                <Link href={`/${session.user.name}/gists`}>Your gists</Link>
              </div>
              <form onSubmit={searchSubmit} className="repoSearch">
                <input type="text" placeholder="Find a repository..." />
                <button type="submit">Search</button>
              </form>
              <div className="repoContainer">
                {props.repos.map((repo) => (
                  <RepoCard
                    key={repo.id}
                    href={`${session.user.name}/${repo.name}`}
                    name={repo.name}
                    description={repo.description}
                    forked={repo.fork}
                    private={repo.private}
                    updatedOn={repo.updated_at}
                    language={repo.language}
                    forks_count={repo.forks_count}
                    watchers_count={repo.watchers_count}
                  />
                ))}
              </div>
            </div>
          </>
        </Layout>
      </>
    );
  }
}
export default Dashboard;

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
    const [reposRes, followersRes, followingRes] = await Promise.all([
      fetch(`https://api.github.com/user/repos`, headers),
      fetch(`https://api.github.com/user/followers`, headers),
      fetch(`https://api.github.com/user/following`, headers),
    ]);
    const [repos, followers, following] = await Promise.all([
      reposRes.json(),
      followersRes.json(),
      followingRes.json(),
    ]);
    return { props: { repos, followers, following } };
  } else {
    return { props: {} };
  }
}
