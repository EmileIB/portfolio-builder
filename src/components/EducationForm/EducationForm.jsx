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
  addEducation,
  removeEducation,
  editSchool,
  editDegree,
  editStart,
  editEnd,
  editDescription,
  setEducation,
} from "../../state/educationSlice";

import { toast } from "react-toastify";

import { ControlledAccordion } from "../ControlledAccordion";
import { useCallback } from "react";

import { formatDescription } from "../../helpers/global-functions";

export const EducationForm = () => {
  const education = useSelector((state) => state.education);
  const dispatch = useDispatch();
  const [parseAccordionItems, setParseAccordionItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEducation, setNewEducation] = useState({
    school: "",
    degree: "",
    start: dayjs(),
    end: dayjs(),
    description: "",
  });

  const stringifyDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  const parseItems = useCallback(() => {
    const items = [];
    // create an array of objects with the following structure:
    // { title: "Education", subtitle: "School Name" }
    education.forEach((item) => {
      items.push({
        id: item.id,
        title: item.school,
        content: (
          <Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                id="outlined-basic"
                label="School Name"
                variant="outlined"
                value={item.school}
                onChange={(e) =>
                  dispatch(
                    editSchool({
                      id: item.id,
                      school: e.target.value,
                    })
                  )
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                id="outlined-basic"
                label="Degree"
                variant="outlined"
                value={item.degree}
                onChange={(e) =>
                  dispatch(
                    editDegree({
                      id: item.id,
                      degree: e.target.value,
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
                          id: item.id,
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
                          id: item.id,
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
                multiline
                rows={3}
                value={item.description}
                onChange={(e) => {
                  const formattedDescription = formatDescription(
                    e.target.value
                  );
                  dispatch(
                    editDescription({
                      id: item.id,
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
                  dispatch(removeEducation(item.id));
                  toast.success("Education Deleted");
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
  }, [education, dispatch]);

  const addNewEducation = () => {
    const ed = {
      id: Math.floor(Math.random() * 100000),
      school: newEducation.school,
      degree: newEducation.degree,
      start: stringifyDate(newEducation.start),
      end: stringifyDate(newEducation.end),
      description: newEducation.description,
    };
    dispatch(addEducation(ed));
    setNewEducation({});
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    setParseAccordionItems(parseItems());
  }, [parseItems]);

  // on reload, get state from local storage
  useEffect(() => {
    const serializedState = JSON.parse(localStorage.getItem("state"));
    if (serializedState === null) return;
    dispatch(setEducation(serializedState.education));
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
              Education
            </Typography>
            <Button onClick={() => setIsAddModalOpen(true)} color="primary">
              Add Education
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
              No Education Added
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
          <Typography
            variant="h6"
            // margin bottom
            sx={{ mb: 2 }}
          >
            Add Education
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="School Name"
              variant="outlined"
              value={newEducation.school}
              onChange={(e) =>
                setNewEducation({ ...newEducation, school: e.target.value })
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="Degree"
              variant="outlined"
              value={newEducation.degree}
              onChange={(e) =>
                setNewEducation({ ...newEducation, degree: e.target.value })
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
                  value={newEducation.startDate}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) => {
                    setNewEducation({
                      ...newEducation,
                      startDate: stringifyDate(newValue),
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
                  value={newEducation.endDate}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) => {
                    setNewEducation({
                      ...newEducation,
                      endDate: stringifyDate(newValue),
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
              rows={3}
              value={newEducation.description}
              onChange={(e) => {
                const formattedDescription = formatDescription(e.target.value);
                setNewEducation({
                  ...newEducation,
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
