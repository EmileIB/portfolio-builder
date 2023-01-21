import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useCallback } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { setSignedIn } from "../../state/userSlice";

import { addUpdateInfo } from "../../utils/info-helper";
import { addUpdateEducations } from "../../utils/education-helper";
import { addUpdateExperiences } from "../../utils/experience-helper";
import { addUpdateProjects } from "../../utils/project-helper";

import { setLoading } from "../../state/globalSlice";
import { setInfo } from "../../state/infoSlice";
import { setExperience } from "../../state/experienceSlice";
import { setEducation } from "../../state/educationSlice";
import { setProject } from "../../state/projectSlice";

const settings = ["Profile", "Logout"];

export const MainAppBar = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (event) => {
    switch (event.target.innerText) {
      case "Profile":
        navigate("/profile");
        break;
      case "Logout":
        localStorage.removeItem("token");
        dispatch(setSignedIn(false));
        navigate("/");
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  const state = useSelector((state) => state);
  const user = useSelector((state) => state.user);

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
    handleCloseUserMenu();
  }, [state, isSignedIn, dispatch]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSave]);

  return (
    <>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#073763",
          height: "65px",
          justifyContent: "center",
        }}
      >
        <Container maxWidth={null}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                "&:hover": {
                  color: "inherit",
                  textDecoration: "none",
                },
              }}
            >
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                PGEN
              </Link>
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem key={"Save Changes"} onClick={handleSave}>
                  <Typography textAlign="center">Save Changes</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                "&:hover": {
                  color: "inherit",
                  textDecoration: "none",
                },
              }}
            >
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                PGEN
              </Link>
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              <Button
                key={"Save (ctrl + s)"}
                onClick={handleSave}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  fontSize: "1.2rem",
                }}
              >
                Save (ctrl + s)
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {user.isSignedIn ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.firstName + " " + user.lastName}
                      src={
                        user.profilePic.name
                          ? "http://localhost:8080/images/" +
                            user.profilePic.name
                          : ""
                      }
                    >
                      {user.firstName.charAt(0) + user.lastName.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  key={"Sign In"}
                  onClick={() => navigate("/login")}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "none",
                    fontSize: "1.2rem",
                  }}
                >
                  Sign In
                </Button>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleSettingClick}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
