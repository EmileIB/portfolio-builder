import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";

import { setName, setAbout, setEmail, setPosition } from "./state/infoSlice";

import { routes } from "./routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#212121",
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
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
