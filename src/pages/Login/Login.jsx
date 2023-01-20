import { Container } from "@mui/system";
import { Box } from "@mui/system";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { login } from "../../utils/user-helper";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { setUser } from "../../state/userSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(emailRegex, "Invalid email address")
        .required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await login(values.email, values.password);
        if (res.success) {
          toast.success("Login Successful");
          localStorage.setItem("token", res.data.token);
          dispatch(
            setUser({
              isSignedIn: true,
              email: res.data.user.email,
              firstName: res.data.user.firstName,
              lastName: res.data.user.lastName,
              profilePic: {
                name: res.data.user.profilePic.name,
                displayName: res.data.user.profilePic.displayName,
              },
            })
          );
          navigate("/editor");
        } else {
          toast.error(res.message);
          formik.setFieldError("email", "Invalid Credentials");
          formik.setFieldError("password", "Invalid Credentials");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

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
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email && formik.errors.email}
            onChange={(e) => {
              formik.setFieldValue("email", e.target.value);
            }}
          />
          <TextField
            label="Password"
            sx={{ width: "100%", mb: 2 }}
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            onChange={(e) => {
              formik.setFieldValue("password", e.target.value);
            }}
            onBlur={formik.handleBlur}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
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
            onClick={formik.handleSubmit}
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
