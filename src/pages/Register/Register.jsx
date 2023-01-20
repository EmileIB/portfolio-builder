import { Container } from "@mui/system";
import { Box } from "@mui/system";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Avatar } from "@mui/material";
import { Grid } from "@mui/material";

import { useState, useRef } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { uploadImage } from "../../utils/image-helper";
import { toast } from "react-toastify";

import { register } from "../../utils/user-helper";

import { useDispatch } from "react-redux";
import { setUser } from "../../state/userSlice";

export const Register = () => {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string()
        .matches(emailRegex, "Invalid email address")
        .required("Required"),
      password: Yup.string()
        .oneOf([Yup.ref("confirmPassword"), null], "Passwords must match")
        .required("Required"),
      phone: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        let imgId = null;
        if (image) {
          const res = await uploadImage(image);
          if (res.success) {
            imgId = res.data[0]._id;
          } else {
            toast.error("Error Uploading Image! Pleae try again later.");
            return;
          }
        }
        const res = await register({
          ...values,
          profilePic: imgId,
        });

        if (res.success) {
          toast.success("Registration Successful");
          formik.resetForm();
          localStorage.setItem("token", res.data.token);
          dispatch(
            setUser({
              isSignedIn: true,
              firstName: res.data.user.firstName,
              lastName: res.data.user.lastName,
              email: res.data.user.email,
              phone: res.data.user.phone,
              profilePic: {
                name: res.data.user.profilePic?.name,
                displayName: res.data.user.profilePic?.displayName,
              },
            })
          );
        } else {
          toast.error("Error Registering User! Please try again later.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error Registering User! Please try again later.");
      }
    },
    onReset: () => {
      setImgSrc("");
      setImage(null);
      fileInputRef.current.value = "";
    },
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                  src={imgSrc}
                  sx={{
                    width: { xs: 200, md: 300 },
                    height: { xs: 200, md: 300 },
                    "&:hover": {
                      cursor: "pointer",
                    },
                    mt: { xs: 3, md: 6 },
                  }}
                  onClick={() => fileInputRef.current.click()}
                />
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setImgSrc(URL.createObjectURL(e.target.files[0]));
                  }}
                  ref={fileInputRef}
                />
                {imgSrc ? (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2, mx: "auto", display: "block" }}
                    onClick={() => {
                      setImgSrc("");
                      setImage(null);
                      fileInputRef.current.value = "";
                    }}
                  >
                    Remove
                  </Button>
                ) : (
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
                  value={formik.values.firstName}
                  onChange={(e) => {
                    formik.setFieldValue("firstName", e.target.value);
                  }}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  onBlur={formik.handleBlur}
                />
                {/* last name */}
                <TextField
                  id="last-name"
                  label="Last Name"
                  type="text"
                  variant="outlined"
                  sx={{ width: "49%" }}
                  value={formik.values.lastName}
                  onChange={(e) => {
                    formik.setFieldValue("lastName", e.target.value);
                  }}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  onBlur={formik.handleBlur}
                />
              </Box>
              {/* email */}
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                sx={{ width: "100%", mb: 2 }}
                value={formik.values.email}
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onBlur={formik.handleBlur}
              />
              {/* phone */}
              <TextField
                id="phone"
                label="Phone Number"
                variant="outlined"
                type="text"
                sx={{ width: "100%", mb: 2 }}
                value={formik.values.phone}
                onChange={(e) => {
                  formik.setFieldValue("phone", e.target.value);
                }}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                onBlur={formik.handleBlur}
              />
              {/* password */}
              <TextField
                id="password"
                type={showPassword ? "text" : "password"}
                sx={{ width: "100%", mb: 2 }}
                value={formik.values.password}
                onChange={(e) => {
                  formik.setFieldValue("password", e.target.value);
                }}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Password"
              />
              {/* confirm password */}
              <TextField
                id="password"
                type={showConfirmPassword ? "text" : "password"}
                sx={{ width: "100%", mb: 2 }}
                value={formik.values.confirmPassword}
                onChange={(e) => {
                  formik.setFieldValue("confirmPassword", e.target.value);
                }}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                onBlur={formik.handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Password"
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
                onClick={formik.handleSubmit}
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
