import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ConnectApiLike, ConnectApi } from "../api/ConnectApi";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  isLiked: {
    fontSize: "33px",
    color: "#CC0000",
  },
}));

export const LikeCommentView = ({ item }) => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  // const API_URL = "https://dj-react-capstone-project.herokuapp.com/cards/";
  const API_URL_LIKE = "https://dj-react-capstone-project.herokuapp.com/liked/";
  // const dataState = ConnectApi(API_URL);
  const dataStateLike = ConnectApiLike(API_URL_LIKE);
  // console.log('Like: ', dataStateLike);
  // console.log('cur: ', currentUser)
  // console.log('item:', item)

  const dbLikeRecord = (item) => {
    return dataStateLike[0].data.map((e) => {
      if (item.id === e.card && currentUser?.data.user.id === e.user) {
        return classes.isLiked;
      }
    });
  };

  const LikeCounter = (item) => {
    let counter_list = 0;
    dataStateLike[0].data?.map((e) => {
      if (item.id === e.card) {
        counter_list++;
      }
    });
    return counter_list;
  };

  return (
    <>
      <Grid marginX={1.5} marginY={1.2}>
        <FavoriteIcon sx = {{fontSize: "30px",color: "#A1A1A1"}} className={dbLikeRecord(item)}/>
        <Box component="span" marginLeft={0.5} marginRight={2} fontSize={19} color="red">
          <code>
            <b style={{ verticalAlign: "10px" }}>{LikeCounter(item)}</b>
          </code>
        </Box>
        <CommentIcon sx={{ marginX: "7px", fontSize: "29px", color: "#A1A1A1" }} />
        <Box component="span" marginLeft={0} marginRight={2} fontSize={19} color="red">
          <code>
            <b style={{ verticalAlign: "10px" }}>{item.comment_count}</b>
          </code>
        </Box>
        <VisibilityIcon sx={{ fontSize: "33px", color: "#A1A1A1" }} />
        <Box component="span" marginLeft={0.7} marginRight={2} fontSize={19} color="red">
          <code>
            <b style={{ verticalAlign: "10px" }}>{item.view_count}</b>
          </code>
        </Box>
      </Grid>
    </>
  );
};
