import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import signInImage from "../assets/signIn.png";
import google from "../assets/google.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { LoginApi } from "../api/ConnectApi";
import { successToastify, errorToastify } from "../styling/toastify";
import { AuthContext } from "../context/AuthContext";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().when('email', {
      is: (email) => !email || email.length === 0,
      then: Yup.string().required("At least one of the fields is required"),
      otherwise: Yup.string()
  }),
  email: Yup.string().email().when('username', {
      is: (username) => !username || username.length === 0,
      then: Yup.string().email().required("At least one of the fields is required"),
      otherwise: Yup.string()
  }),
  password: Yup.string().required("No password provided."),
},
[ [ 'username', 'email' ] ]
);

export default function Login() {
  const API_URL = "https://dj-react-capstone-project.herokuapp.com/auth_login/login/";
  const history = useHistory();
  const { setCurrentUser } = useContext(AuthContext);

  const SignIn = async (...args) => {
    try {
      // console.log(...args);
      const userCredential = await LoginApi(API_URL, ...args);
      console.log("userCredential", userCredential);
      successToastify(`Signed in successfully. Welcome ${userCredential.data.user.username} 🖐`);
      setCurrentUser(userCredential)
      history.push("/");
    } catch (error) {
      errorToastify("The password is invalid or the user does not have a password!");
    }
  };

  const onSubmit = (values) => SignIn(values);

  // const signUpWıthGoogle = () => {
  //   SignUpProvider();
  // };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <Box sx={{ backgroundImage: "url(https://picsum.photos/1600/900)", width: "100%", minHeight: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", p: 11 }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          borderRadius: 3,
          boxShadow: "10px 10px 4px grey",
          backgroundColor: "#fff",
          mt: 10,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Avatar
            src={signInImage}
            alt="signin"
            sx={{
              width: 150,
              height: 150,
              boxShadow: "4px 4px",
              border: 4,
              borderColor: "#046582",
              borderRadius: 2,
              mb: 3,
            }}
          />

          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth id="username" variant="filled" label="Username" name="username" autoComplete="username" onChange={formik.handleChange} value={formik.values.username} onBlur={formik.handleBlur} />
                {formik.touched.username && formik.errors.username ? <Box sx={{ color: "red", fontSize: 13, ml: 1 }}>{formik.errors.username} </Box> : null}
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth id="email" variant="filled" label="Email Address" name="email" autoComplete="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                {formik.touched.email && formik.errors.email ? <Box sx={{ color: "red", fontSize: 13, ml: 1 }}>{formik.errors.email} </Box> : null}
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="password" label="Password" type="password" id="password" variant="filled" autoComplete="new-password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                {formik.touched.password && formik.errors.password ? <Box sx={{ color: "red", fontSize: 13, ml: 1 }}>{formik.errors.password} </Box> : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#046582",
                "&:hover": { bgcolor: "#808080" },
                fontWeight: "bold",
              }}
            >
              Sign In
            </Button>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mb: 2,
              bgcolor: "#fff",
              color: "#000",
              "&:hover": { bgcolor: "#808080" },
              fontWeight: "bold",
            }}
            // onClick={signUpWıthGoogle}
          >
            WITH
            <Avatar src={google} alt="google" sx={{ borderRadius: 0, width: 70, height: 24, ml: 1 }} />
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register">Don't you have an account? Sign up</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
