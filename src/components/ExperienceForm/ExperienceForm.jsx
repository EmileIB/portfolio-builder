import React, { useEffect, useState } from "react";

import {
  Box,
  Card,
  TextField,
  Typography,
  FormControl,
  Button,
  Modal,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

import { useSelector, useDispatch } from "react-redux";
import {
  addExperience,
  removeExperience,
  editCompany,
  editPosition,
  editStart,
  editEnd,
  editDescription,
  setExperience,
} from "../../state/experienceSlice";

import { toast } from "react-toastify";

import { ControlledAccordion } from "../ControlledAccordion";
import { useCallback } from "react";

import { formatDescription } from "../../helpers/global-functions";

export const ExperienceForm = () => {
  const experience = useSelector((state) => state.experience);
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const dispatch = useDispatch();
  const [parseAccordionItems, setParseAccordionItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    start: dayjs(),
    end: dayjs(),
    description: "",
  });

  const stringifyDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  const parseItems = useCallback(() => {
    const items = [];
    experience.forEach((item) => {
      items.push({
        id: item._id,
        title: item.company,
        content: (
          <Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                id="outlined-basic"
                label="Company"
                variant="outlined"
                value={item.company}
                onChange={(e) =>
                  dispatch(
                    editCompany({
                      _id: item._id,
                      company: e.target.value,
                    })
                  )
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                id="outlined-basic"
                label="Position"
                variant="outlined"
                value={item.position}
                onChange={(e) =>
                  dispatch(
                    editPosition({
                      _id: item._id,
                      position: e.target.value,
                    })
                  )
                }
              />
            </FormControl>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <FormControl sx={{ width: "49%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    disableMaskedInput
                    label="Start Date"
                    inputFormat="MM/DD/YYYY"
                    value={item.start}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(newValue) => {
                      dispatch(
                        editStart({
                          _id: item._id,
                          start: stringifyDate(newValue),
                        })
                      );
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl sx={{ width: "49%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    disableMaskedInput
                    label="End Date"
                    inputFormat="MM/DD/YYYY"
                    value={item.end}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(newValue) => {
                      dispatch(
                        editEnd({
                          _id: item._id,
                          end: stringifyDate(newValue),
                        })
                      );
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={item.description}
                multiline
                fullWidth
                rows={3}
                onChange={(e) => {
                  const formattedDescription = formatDescription(
                    e.target.value
                  );
                  dispatch(
                    editDescription({
                      _id: item._id,
                      description: formattedDescription,
                    })
                  );
                }}
              />
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  dispatch(removeExperience(item._id));
                  toast.success("Experience Deleted");
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
  }, [experience, dispatch]);

  const addNewExperience = () => {
    const ex = {
      _id: Math.floor(Math.random() * 100000),
      company: newExperience.company,
      position: newExperience.position,
      start: stringifyDate(newExperience.start),
      end: stringifyDate(newExperience.end),
      description: newExperience.description,
    };
    dispatch(addExperience(ex));
    setNewExperience({});
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    setParseAccordionItems(parseItems());
  }, [parseItems]);

  // on reload, get state from local storage
  useEffect(() => {
    if (isSignedIn) return;
    const serializedState = JSON.parse(localStorage.getItem("state"));
    if (serializedState === null) return;
    dispatch(setExperience(serializedState.experience));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              Experience
            </Typography>
            <Button onClick={() => setIsAddModalOpen(true)} color="primary">
              Add Experience
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
              No Experience Added
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
            maxWidth: "100%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Experience
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="Company"
              variant="outlined"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  company: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="Position"
              variant="outlined"
              value={newExperience.position}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  position: e.target.value,
                })
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
            <FormControl sx={{ width: "49%" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  disableMaskedInput
                  label="Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={newExperience.startDate}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) => {
                    setNewExperience({
                      ...newExperience,
                      startDate: newValue,
                    });
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ width: "49%" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  disableMaskedInput
                  label="End Date"
                  inputFormat="MM/DD/YYYY"
                  value={newExperience.endDate}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) => {
                    setNewExperience({
                      ...newExperience,
                      endDate: newValue,
                    });
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              multiline
              fullWidth
              rows={3}
              value={newExperience.description}
              onChange={(e) => {
                const formattedDescription = formatDescription(e.target.value);
                setNewExperience({
                  ...newExperience,
                  description: formattedDescription,
                });
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
              onClick={addNewExperience}
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
