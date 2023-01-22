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
import { Link } from "react-router-dom";

import { useResizeDetector } from "react-resize-detector";

export const PortfolioAppBar = ({ scrollTo, pages, name }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { width, ref } = useResizeDetector();

  useEffect(() => {
    width >= 900 ? setIsExpanded(true) : setIsExpanded(false);
  }, [width]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = async () => {
    setAnchorElNav(null);
  };

  const scrollToSection = async (section) => {
    await handleCloseNavMenu();
    scrollTo(section);
  };

  return (
    <AppBar position="static" ref={ref}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: isExpanded ? "flex" : "none",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "white",
              },
            }}
          >
            <Link style={{ color: "inherit", textDecoration: "none" }}>
              {name}
            </Link>
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
                <MenuItem
                  key={page.name}
                  onClick={() => scrollToSection(page.scrollTo)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: isExpanded ? "none" : "flex",
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "white",
              },
            }}
          >
            <Link style={{ color: "inherit", textDecoration: "none" }}>
              {name}
            </Link>
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
                key={page.name}
                onClick={() => scrollToSection(page.scrollTo)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  margin: "0 0.5rem",
                  fontSize: "1rem",
                  fontFamily: "monospace",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
