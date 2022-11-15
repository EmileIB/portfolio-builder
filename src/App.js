import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";

import { Editor } from "./components/Editor";
import { useEffect } from "react";

import { setName, setAbout, setEmail, setPosition } from "./state/infoSlice";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <p>
        Name: {info.name} <br />
        Email: {info.email} <br />
        Position: {info.position} <br />
        About: {info.about}
      </p>
      {/* <Editor /> */}
    </ThemeProvider>
  );
};

export default App;
