import React, { useState, useEffect } from "react";
import Split from "react-split";
import { useResizeDetector } from "react-resize-detector";

import { PotfolioPane, MainAppBar, BuilderPane } from "../../components";
import { useSelector } from "react-redux";

import { Button, Box, CircularProgress } from "@mui/material";

import "./Editor.css";

export const Editor = () => {
  const user = useSelector((state) => state.user);
  const appBarHeight = "65px";

  const { width, ref } = useResizeDetector();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    width <= 950 ? setIsSmallScreen(true) : setIsSmallScreen(false);
  }, [width]);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div ref={ref}>
      <MainAppBar />
      {user.isSignedIn && user.isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress size={50} />
        </Box>
      ) : isSmallScreen ? (
        <>
          <Box
            variant="contained"
            color="primary"
            style={{
              position: "fixed",
              bottom: 0,
              right: 0,
              zIndex: 100,
              width: "100%",
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              padding: "1rem",
            }}
            onClick={togglePreview}
          >
            <Button variant="contained" color="primary" onClick={togglePreview}>
              {isPreview ? "Edit" : "Preview"}
            </Button>
          </Box>
          {isPreview && <PotfolioPane />}

          {!isPreview && <BuilderPane />}
        </>
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
