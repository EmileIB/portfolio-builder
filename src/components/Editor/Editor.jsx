import Split from "react-split";
import { PortfolioPage } from "../PotfolioPage";
import { BuilderPage } from "../BuilderPage";
import "./Editor.css";

export const Editor = () => {
  return (
    <Split
      sizes={[20, 80]}
      minSize={[500, 400]}
      className="split"
      style={{ height: "100vh" }}
    >
      <div className="pane">
        <BuilderPage />
      </div>
      <div className="pane">
        <PortfolioPage />
      </div>
    </Split>
  );
};
