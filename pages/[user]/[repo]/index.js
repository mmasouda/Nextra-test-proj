import React from "react";
import Layout from "../../../components/Layout";
import TabsBar from "../../../components/TabsBar";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

function RepoDetailPage(props) {
  const { data: session } = useSession();
  if (session) {
    return (
      <Layout>
        <TabsBar props={props} />
      </Layout>
    );
  }
}
export default RepoDetailPage;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const repoName = context.query.repo;
  const user = context.query.user;
  if (session) {
    const headers = {
      method: "GET",
      headers: {
        Authorization: `Token ${session.accessToken}`,
      },
    };
    const [repoRes, contentRes, issuesRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${user}/${repoName}`, headers),
      fetch(
        `https://api.github.com/repos/${user}/${repoName}/contents/`,
        headers
      ),
      fetch(`https://api.github.com/repos/${user}/${repoName}/issues`, headers),
    ]);
    const [repo, content, issues] = await Promise.all([
      repoRes.json(),
      contentRes.json(),
      issuesRes.json(),
    ]);
    return { props: { repo, content, issues } };
  } else {
    return { props: {} };
  }
}
