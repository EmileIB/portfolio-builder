import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useSelector } from "react-redux";

import { useResizeDetector } from "react-resize-detector";

const pages = [
  "About Me",
  "Education",
  "Work Experience",
  "Projects",
  "Contact",
];

export const PortfolioAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { width, ref } = useResizeDetector();

  const name = useSelector((state) => state.info.name);

  useEffect(() => {
    width >= 900 ? setIsExpanded(true) : setIsExpanded(false);
  }, [width]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" ref={ref}>
      <Container>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: isExpanded ? "flex" : "none", mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: isExpanded ? "flex" : "none",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {name}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: isExpanded ? "none" : "flex",
            }}
          >
            <IconButton
              size="large"
              aria-label="Pages"
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
                display: isExpanded ? "none" : "block",
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: isExpanded ? "none" : "flex", mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: isExpanded ? "none" : "flex",
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {name}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: isExpanded ? "flex" : "none",
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  margin: "0 0.5rem",
                  fontSize: "1rem",
                  fontFamily: "monospace",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
