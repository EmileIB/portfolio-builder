import React, { useState, useEffect } from "react";
import Split from "react-split";
import { useResizeDetector } from "react-resize-detector";

import { PotfolioPane, MainAppBar, BuilderPane } from "../../components";

import "./Editor.css";

export const Editor = () => {
  const appBarHeight = "65px";

  const { width, ref } = useResizeDetector();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    width <= 950 ? setIsSmallScreen(true) : setIsSmallScreen(false);
  }, [width]);

  return (
    <div ref={ref}>
      <MainAppBar />
      {isSmallScreen ? (
        <BuilderPane />
      ) : (
        <Split
          sizes={[40, 60]}
          minSize={[500, 400]}
          className="split"
          style={{ height: `calc(100vh - ${appBarHeight})` }}
        >
          <div className="pane">
            <BuilderPane />
          </div>
          <div className="pane">
            <PotfolioPane />
          </div>
        </Split>
      )}
    </div>
  );
};
