import { Container } from "@mui/material";
import Split from "react-split";
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";
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
        <Container
          style={{
            margin: "0",
          }}
        >
          <h1>Left Pane</h1>
        </Container>
      </div>
      <div className="pane">
        <ResponsiveAppBar />
        <Container
          style={{
            paddingTop: "1rem",
          }}
        >
          <h1>Right Pane</h1>
        </Container>
      </div>
    </Split>
  );
};
