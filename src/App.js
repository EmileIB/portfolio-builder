import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";

import { Editor } from "./components/Editor";
import { useEffect } from "react";

import { setName, setAbout, setEmail, setPosition } from "./state/infoSlice";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // change bg color to #212121
    background: {
      default: "#212121",
      paper: "#212121",
    },
  },
});

const App = () => {
  const info = useSelector((state) => state.info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setName("John Doe"));
    dispatch(setEmail("johndoe@gmail.com"));
    dispatch(setPosition("Software Engineer"));
    dispatch(setAbout("I am a software engineer"));
    console.log(info);
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Editor />
    </ThemeProvider>
  );
};

export default App;
