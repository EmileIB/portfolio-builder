import React, { useEffect, useState } from "react";

import {
  Box,
  Card,
  TextField,
  Typography,
  FormControl,
  Button,
  Modal,
  Tooltip,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { ControlledAccordion } from "../ControlledAccordion";
import { useCallback } from "react";

import {
  addProject,
  removeProject,
  editTitle,
  editImage,
  editDescription,
  editLink,
  setProject,
} from "../../state/projectSlice";

export const ProjectsForm = () => {
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [parseAccordionItems, setParseAccordionItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    link: "",
    image: "",
  });

  const parseItems = useCallback(() => {
    const items = [];
    projects.forEach((item) => {
      items.push({
        id: item.id,
        title: item.title,
        content: (
          <Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                id="outlined-basic"
                label="Project Title"
                variant="outlined"
                value={item.title}
                onChange={(e) =>
                  dispatch(
                    editTitle({
                      id: item.id,
                      title: e.target.value,
                    })
                  )
                }
              />
            </FormControl>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Tooltip title="eg: https://pgen.netlify.app" followCursor>
                <FormControl sx={{ width: "49%" }}>
                  <TextField
                    id="outlined-basic"
                    label="Project Link"
                    variant="outlined"
                    value={item.link}
                    onChange={(e) =>
                      dispatch(
                        editLink({
                          id: item.id,
                          link: e.target.value,
                        })
                      )
                    }
                  />
                </FormControl>
              </Tooltip>

              <Tooltip
                title="eg: https://i.imgur.com/Gb1pZUW.jpeg"
                followCursor
              >
                <FormControl sx={{ width: "49%" }}>
                  <TextField
                    id="outlined-basic"
                    label="Project Image"
                    variant="outlined"
                    value={item.image}
                    onChange={(e) =>
                      dispatch(
                        editImage({
                          id: item.id,
                          image: e.target.value,
                        })
                      )
                    }
                  />
                </FormControl>
              </Tooltip>
            </Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={item.description}
                onChange={(e) =>
                  dispatch(
                    editDescription({
                      id: item.id,
                      description: e.target.value,
                    })
                  )
                }
              />
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  dispatch(removeProject(item.id));
                  toast.success("Project Deleted");
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ),
      });
    });

    return items;
  }, [projects, dispatch]);

  const addNewEducation = () => {
    const ed = {
      id: Math.floor(Math.random() * 100000),
      title: newProject.title,
      description: newProject.description,
      link: newProject.link,
      image: newProject.image,
    };
    dispatch(addProject(ed));
    setNewProject({});
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    setParseAccordionItems(parseItems());
  }, [parseItems]);

  // on reload, get state from local storage
  useEffect(() => {
    const serializedState = JSON.parse(localStorage.getItem("state"));
    if (serializedState === null) return;
    dispatch(setProject(serializedState.projects));
  }, [dispatch]);

  return (
    <>
      <Card
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "century gothic",
              }}
            >
              Projects
            </Typography>
            <Button onClick={() => setIsAddModalOpen(true)} color="primary">
              Add Project
            </Button>
          </Box>

          <ControlledAccordion items={parseAccordionItems} />
          {parseAccordionItems.length === 0 && (
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                fontFamily: "century gothic",
              }}
            >
              No Projects Added
            </Typography>
          )}
        </Box>
      </Card>
      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Project
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="Project Title"
              variant="outlined"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mb: 2,
            }}
          >
            <Tooltip title="eg: https://pgen.netlify.app" followCursor>
              <FormControl sx={{ width: "49%" }}>
                <TextField
                  id="outlined-basic"
                  label="Project Link"
                  variant="outlined"
                  value={newProject.link}
                  onChange={(e) =>
                    setNewProject({ ...newProject, link: e.target.value })
                  }
                />
              </FormControl>
            </Tooltip>
            <Tooltip title="eg: https://i.imgur.com/Gb1pZUW.jpeg" followCursor>
              <FormControl sx={{ width: "49%" }}>
                <TextField
                  id="outlined-basic"
                  label="Project Image"
                  variant="outlined"
                  value={newProject.image}
                  onChange={(e) =>
                    setNewProject({ ...newProject, image: e.target.value })
                  }
                />
              </FormControl>
            </Tooltip>
          </Box>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              value={newProject.description}
              onChange={(e) => {
                setNewProject({ ...newProject, description: e.target.value });
              }}
            />
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => setIsAddModalOpen(false)}
              color="error"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={addNewEducation}
              color="primary"
              sx={{ ml: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
