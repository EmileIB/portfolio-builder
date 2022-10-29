import Split from "react-split";
import "./Editor.css";

export const Editor = () => {
  return (
    <Split className="split" style={{ height: "100vh" }}>
      <div className="bg-red"></div>
      <div className="bg-yellow"></div>
    </Split>
  );
};
