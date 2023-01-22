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

import { useDispatch, useSelector } from "react-redux";
import { setSignedIn } from "../../state/userSlice";

export const MainAppBar = ({ handleSave }) => {
  const dispatch = useDispatch();
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

  const user = useSelector((state) => state.user);

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
                <MenuItem
                  key={"Save Changes"}
                  onClick={() => {
                    handleSave();
                    handleCloseNavMenu();
                  }}
                >
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
                <MenuItem key="profile" onClick={() => navigate("/profile")}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  key="logout"
                  onClick={() => {
                    localStorage.removeItem("token");
                    dispatch(setSignedIn(false));
                    navigate("/");
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
