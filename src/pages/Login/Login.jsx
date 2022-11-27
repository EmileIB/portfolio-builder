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

import { Link, useNavigate } from "react-router-dom";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useState } from "react";

export const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    navigate("/editor");
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
        <div style={{ width: "30%" }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontFamily: "century gothic",
              mb: 3,
              mt: { xs: 3, md: 0 },
            }}
          >
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            sx={{ width: "100%", mb: 2 }}
          />
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
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
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
            color="primary"
            onClick={handleClick}
          >
            Login
          </Button>
          <Typography
            variant="body1"
            align="right"
            sx={{
              fontFamily: "monospace",
              mb: 2,
            }}
          >
            Don't have an account?{" "}
            <Link to="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </div>
      </Box>
    </Container>
  );
};
