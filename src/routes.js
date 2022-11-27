import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Editor } from "./pages/Editor";
import { Register } from "./pages/Register";

export const routes = [
  {
    path: "/",
    exact: true,
    component: <Home />,
  },
  {
    path: "/login",
    exact: true,
    component: <Login />,
  },
  {
    path: "/editor",
    exact: true,
    component: <Editor />,
  },
  {
    path: "/register",
    exact: true,
    component: <Register />,
  },
];
