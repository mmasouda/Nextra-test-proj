import React from "react";
import Layout from "../../../components/Layout";
import SearchResCard from "../../../components/Cards/SearchResCard";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

function Search(props) {
  console.log(props.search.items);
  return (
    <Layout>
      <div className="searchResContainer">
        <h3>Search results</h3>
        {props.search.items.map((el) => (
          <SearchResCard
            key={el.id}
            ownerName={el.owner.login}
            repoName={el.name}
            description={el.description}
            updatedOn={el.updated_at}
            codeLanguage={el.language}
          />
        ))}
      </div>
    </Layout>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const searchQuery = context.query.searchQuery;
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
    const searchRes = await fetch(
      `https://api.github.com/search/repositories?q=${searchQuery}`,
      headers
    );
    const search = await searchRes.json();
    return { props: { search } };
  } else {
    return { props: {} };
  }
}
