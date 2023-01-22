import React, { useState, useEffect, useCallback } from "react";
import Split from "react-split";
import { useResizeDetector } from "react-resize-detector";

import { PortfolioPane, MainAppBar, BuilderPane } from "../../components";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from "@mui/material";

import { toast } from "react-toastify";

import { addUpdateInfo } from "../../utils/info-helper";
import { addUpdateEducations } from "../../utils/education-helper";
import { addUpdateExperiences } from "../../utils/experience-helper";
import { addUpdateProjects } from "../../utils/project-helper";

import { setLoading } from "../../state/globalSlice";
import { setInfo } from "../../state/infoSlice";
import { setExperience } from "../../state/experienceSlice";
import { setEducation } from "../../state/educationSlice";
import { setProject } from "../../state/projectSlice";
import { deployPortfolio } from "../../utils/portfolio-helper";

import { DeployedDialog } from "./DeployedDialog";

import "./Editor.css";

export const Editor = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  const user = useSelector((state) => state.user);
  const appBarHeight = "65px";

  const { width, ref } = useResizeDetector();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const [deployDialogOpen, setDeployDialogOpen] = useState(false);
  const [portfolioId, setPortfolioId] = useState("");
  const [customLink, setCustomLink] = useState("");
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDeployDialogOpen(true);
  };

  const handleClose = () => {
    setDeployDialogOpen(false);
  };

  useEffect(() => {
    width <= 950 ? setIsSmallScreen(true) : setIsSmallScreen(false);
  }, [width]);

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const state = useSelector((state) => state);

  const handleSave = useCallback(() => {
    if (isSignedIn) {
      dispatch(setLoading(true));
      Promise.all([
        addUpdateInfo(state.info).then((res) => {
          dispatch(setInfo(res.data));
        }),
        addUpdateExperiences(state.experience).then((res) => {
          dispatch(setExperience(res.data));
        }),
        addUpdateEducations(state.education).then((res) => {
          dispatch(setEducation(res.data));
        }),
        addUpdateProjects(state.projects).then((res) => {
          dispatch(setProject(res.data));
        }),
      ]).then(() => {
        dispatch(setLoading(false));
        toast.success("Your changes have been saved!");
      });
    } else {
      localStorage.setItem("state", JSON.stringify(state));
      toast.success("Your changes have been saved!");
    }
  }, [state, isSignedIn, dispatch]);

  const handleDeploy = useCallback(() => {
    handleSave();
    deployPortfolio({
      info: state.info,
      experiences: state.experience,
      educations: state.education,
      projects: state.projects,
    })
      .then((res) => {
        if (res.success) {
          setSuccessDialogOpen(true);
          setPortfolioId(res.data._id);
          setCustomLink(res.data.customLink);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [state, handleSave]);

  return (
    <div ref={ref}>
      <MainAppBar handleSave={handleSave} />
      {user.isLoading ? (
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
          {isPreview && <PortfolioPane state={state} />}

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
            <BuilderPane handleDeploy={handleClickOpen} />
          </div>
          <div className="pane">
            <PortfolioPane state={state} />
          </div>
        </Split>
      )}

      <Dialog
        open={deployDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deploy your portfolio?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to deploy your portfolio? If this is your
            first time, this action will automatically save your changes and
            update the live version of your portfolio, or create your first.
          </DialogContentText>
          {!isSignedIn ? (
            <Alert severity="warning" sx={{ width: "100%", mt: 2 }}>
              As a guest, this action will update any previous portfolio created
              on this IP.
            </Alert>
          ) : (
            ""
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              handleDeploy();
              handleClose();
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <DeployedDialog
        isOpen={successDialogOpen}
        setIsOpen={setSuccessDialogOpen}
        portfolioId={portfolioId}
        customLink={customLink}
        setCustomLink={setCustomLink}
      />
    </div>
  );
};
