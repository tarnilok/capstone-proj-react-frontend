import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import newCard from "../assets/newCard.png";
// import { addInfo } from "../auth/firebase";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CrudCardApi } from "../api/ConnectApi";
import { successToastify, errorToastify } from "../styling/toastify";

const NewCard = () => {
  const API_URL = "https://dj-react-capstone-project.herokuapp.com/cards/";
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const AddNewCard = async (...args) => {
    try {
      console.log('kart: ', ...args);
      await CrudCardApi(API_URL, [...args, currentUser.data.user.id, currentUser.data.key], 'post');
      successToastify("Added successfully");
      history.push("/");
    } catch (error) {
      errorToastify("Something went wrong, try again!");
    }
  };

  const handleaddInfoSubmit = (e) => {
    e.preventDefault() 
    const { title, url, content } = e.target
    AddNewCard(title.value, url.value, content.value);
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ borderRadius: 3, boxShadow: "10px 10px 4px grey", backgroundColor: "#fff", mt: 15, border: 1 }}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
        <Avatar src={newCard} alt="signup" sx={{ width: 150, height: 150, borderRadius: 0 }} />
        <Typography sx={{ fontSize: "25px", mt: "1rem", fontFamily: "Girassol", fontWeight: "bold", color: "#046582" }}>{`─── ADD A NEW CARD ───`}</Typography>
        <Box component="form" onSubmit={handleaddInfoSubmit} id="myForm" sx={{ mt: 3, method: "POST" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField autoComplete="fname" name="title" fullWidth id="title" variant="filled" label="Title" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="url" variant="filled" label="Image URL" name="url" autoComplete="url" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={10} id="content" variant="filled" label="Content" name="content" required />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: "#046582", "&:hover": { bgcolor: "#808080" }, fontWeight: "bold" }}>
            ADD
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewCard;
