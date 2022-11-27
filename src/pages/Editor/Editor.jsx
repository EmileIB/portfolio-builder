import Split from "react-split";
import { PortfolioPage } from "../../components/PotfolioPage";
import { BuilderPage } from "../../components/BuilderPage";
import { MainAppBar } from "../../components/MainAppBar";
import "./Editor.css";

export const Editor = () => {
  const appBarHeight = "65px";

  return (
    <>
      <MainAppBar />
      <Split
        sizes={[40, 60]}
        minSize={[500, 400]}
        className="split"
        style={{ height: `calc(100vh - ${appBarHeight})` }}
      >
        <div className="pane">
          <BuilderPage />
        </div>
        <div className="pane">
          <PortfolioPage />
        </div>
      </Split>
    </>
  );
};
