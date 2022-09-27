import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RepoContent from "./Tabs/RepoContent";
import Issues from "./Tabs/Issues";

function TabsBar({ props }) {
  return (
    <section className="tabsContainer">
      <div className="tabsHeader">
        <img
          src={props.repo.private ? "/lock-private.svg" : "/lock-public.svg"}
        />
        <h2>
          {props.repo.owner.login} / {props.repo.name}{" "}
          <span>{props.repo.private ? "Private" : "Public"}</span>
        </h2>
      </div>
      <Tabs
        defaultActiveKey="Code"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Code" title="Code">
          <RepoContent
            branch={props.repo.default_branch}
            createdOn={props.repo.created_at}
            content={props.content}
            description={props.repo.description}
            forksCount={props.repo.forks_count}
            watchersCount={props.repo.watchers_count}
          />
        </Tab>
        <Tab eventKey="Issues" title="Issues">
          <Issues props={props} />
        </Tab>
      </Tabs>
    </section>
  );
}

export default TabsBar;
