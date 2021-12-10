import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateUserApi } from "../api/ConnectApi";
import { successToastify, errorToastify } from "../styling/toastify";
import Button from "@mui/material/Button";

const initialValues = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
};

const validationSchema = Yup.object({
  userName: Yup.string().max(15, "Must be 15 characters or less").required("Required.Enter a Username"),
  firstName: Yup.string().max(15, "Must be 15 characters or less"),
  lastName: Yup.string().max(15, "Must be 15 characters or less"),
  email: Yup.string().email("Invalid email address").required("Required.Enter email address"),
});

const Profile = () => {
  const API_URL = "https://dj-react-capstone-project.herokuapp.com/auth_login/user/";
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  console.log(currentUser)

  const ProfileUpdate = async (...args) => {
    console.log('args: ', args)
    try {
      const userCredential = await UpdateUserApi(API_URL, args, currentUser.data.key );
      // console.log('aaa: ', userCredential);
      successToastify(`Updated Successfully`);
      setCurrentUser(...currentUser, userCredential)
      console.log('bu: ', currentUser)
      history.push("/");
    } catch (error) {
      errorToastify("Something went wrong. Please try again!");
    }
  };

  const onSubmit = (values) => ProfileUpdate(values);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Container component="main" maxWidth="xs" sx={{ borderRadius: 3, boxShadow: "10px 10px 4px grey", backgroundColor: "#fff", mt: 20, border: 1 }}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
        <Typography sx={{ fontSize: "25px", mt: "1rem", fontFamily: "Girassol", fontWeight: "bold", color: "#046582" }}>{`─── PROFILE ───`}</Typography>
        <Box component="form" onSubmit={formik.handleSubmit} id="myForm" sx={{ mt: 3, p: 1, method: "POST" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField autoComplete="userName" defaultValue={currentUser.data.user.username}  name="userName" fullWidth id="userName" variant="outlined" label="User Name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.userName && formik.errors.userName ? <Box sx={{ color: "red", fontSize: 13, ml: 1 }}>{formik.errors.userName} </Box> : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="fname" name="firstName" fullWidth id="firstName" variant="outlined" label="First Name" onChange={formik.handleChange} defaultValue={currentUser.data.user.first_name} onBlur={formik.handleBlur} />
              {formik.touched.firstName && formik.errors.firstName ? <Box sx={{ color: "red", fontSize: 13, ml: 1 }}>{formik.errors.firstName} </Box> : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id="lastName" variant="outlined" label="Last Name" name="lastName" autoComplete="lname" onChange={formik.handleChange} defaultValue={currentUser.data.user.last_name} onBlur={formik.handleBlur} />
              {formik.touched.lastName && formik.errors.lastName ? <Box sx={{ color: "red", fontSize: 13, ml: 1 }}>{formik.errors.lastName} </Box> : null}
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="email" variant="outlined" label="Email Address" name="email" autoComplete="email" onChange={formik.handleChange} defaultValue={currentUser.data.user.email} onBlur={formik.handleBlur} />
              {formik.touched.email && formik.errors.email ? <Box sx={{ color: "red", fontSize: 13, ml: 1 }}>{formik.errors.email} </Box> : null}
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
              UPDATE
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
