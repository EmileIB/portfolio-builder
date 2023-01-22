import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Editor } from "./pages/Editor";
import { Register } from "./pages/Register";
import { Portfolio } from "./pages/Portfolio";

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
  {
    path: "/portfolio/:id",
    exact: true,
    component: <Portfolio />,
  },
];
