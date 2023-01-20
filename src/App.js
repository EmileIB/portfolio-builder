import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { routes } from "./routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./state/userSlice";
import { auth } from "./utils/user-helper";
import { useEffect } from "react";
import { setLoading } from "./state/userSlice";
import { LinearProgress, Stack } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#212121",
    },
  },
});

const App = () => {
  const isLoading = useSelector((state) => state.global.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    auth().then((response) => {
      if (response.success) {
        dispatch(
          setUser({
            isSignedIn: true,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            phone: response.data.phone,
            profilePic: {
              name: response.data.profilePic?.name,
              displayName: response.data.profilePic?.displayName,
            },
          })
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {isLoading && (
          <Stack sx={{ width: "100%", color: "white" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        )}
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

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
    </>
  );
};

export default App;
