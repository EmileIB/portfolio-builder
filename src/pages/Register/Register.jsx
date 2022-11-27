import { Container } from "@mui/system";
import { Box } from "@mui/system";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";

import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Register = () => {
  const [src, setSrc] = useState("");

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    console.log(values);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: { md: "calc(100vh - 115px)" },
        }}
      >
        <div style={{ width: "100%" }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontFamily: "century gothic",
              mb: 3,
              mt: { xs: 3, md: 0 },
            }}
          >
            Register Now
          </Typography>

          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div>
                <Avatar
                  src={src}
                  sx={{
                    width: { xs: 200, md: 300 },
                    height: { xs: 200, md: 300 },
                    "&:hover": {
                      cursor: "pointer",
                    },
                    mt: { xs: 3, md: 6 },
                  }}
                  onClick={() => document.getElementById("file").click()}
                />
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setSrc(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                {!src && (
                  <label htmlFor="file" style={{ width: "100%" }}>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{
                        fontFamily: "monospace",
                        mt: 1,
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      Upload
                    </Typography>
                  </label>
                )}
                {src && (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2, mx: "auto", display: "block" }}
                    onClick={() => setSrc("")}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: { xs: 3, md: 6 },
                  mx: "auto",
                  mb: 2,
                }}
              >
                {/* first name */}
                <TextField
                  id="first-name"
                  label="First Name"
                  type="text"
                  variant="outlined"
                  sx={{ width: "49%" }}
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                />
                {/* last name */}
                <TextField
                  id="last-name"
                  label="Last Name"
                  type="text"
                  variant="outlined"
                  sx={{ width: "49%" }}
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                />
              </Box>
              {/* email */}
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                sx={{ width: "100%", mb: 2 }}
                value={values.email}
                onChange={handleChange("email")}
              />
              {/* phone */}
              <TextField
                id="phone"
                label="Phone Number"
                variant="outlined"
                type="text"
                sx={{ width: "100%", mb: 2 }}
                value={values.phone}
                onChange={handleChange("phone")}
              />
              {/* password */}
              <FormControl sx={{ width: "100%", mb: 2 }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {/* confirm password */}
              <FormControl sx={{ width: "100%", mb: 2 }} variant="outlined">
                <InputLabel htmlFor="confirm-password">Password</InputLabel>
                <OutlinedInput
                  id="confirm-password"
                  type={values.showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  fontWeight: "bold",
                  height: 50,
                  fontSize: 20,
                  fontFamily: "monospace",
                  mb: 2,
                }}
                onClick={handleClick}
              >
                Sign Up
              </Button>
              <Typography
                variant="body1"
                align="right"
                sx={{
                  fontFamily: "monospace",
                  mb: 2,
                }}
              >
                Already have an account?{" "}
                <Link to="/login" underline="hover">
                  Login
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Container>
  );
};
