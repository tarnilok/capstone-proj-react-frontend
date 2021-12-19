/* eslint-disable array-callback-return */
import React, { useContext, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import { CrudCardApi, ConnectApiLikeDel, LikeViewApi, ConnectApiLike, CommentCardApi, PostComment } from "../api/ConnectApi";
import { successToastify, errorToastify } from "../styling/toastify";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) => ({
  isLiked: {
    fontSize: "48px",
    color: "#CC0000",
    "&:hover": { cursor: "pointer" },
  },
}));

const DetailsCard = () => {
  const { cardDetail, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(false);
  const classes = useStyles();
  // console.log('hangisi: ', cardDetail)

  const API_URL = "https://dj-react-capstone-project.herokuapp.com/cards/" + cardDetail.id + "/";
  const API_URL_LIKE = "https://dj-react-capstone-project.herokuapp.com/liked/";
  const API_URL_COMMENT = "https://dj-react-capstone-project.herokuapp.com/comments/";

  const dataStateLike = ConnectApiLike(API_URL_LIKE);
  const commentData = CommentCardApi(API_URL_COMMENT, ["", "", "", currentUser.data.key], "get");
  console.log(commentData);

  let id;
  dataStateLike[0].data?.map((e) => (cardDetail.id === e.card && currentUser?.data.user.id === e.user ? (id = e.id) : null));
  const API_URL_LIKE_DELETE = "https://dj-react-capstone-project.herokuapp.com/liked/" + id + "/";

  const DeleteCard = async () => {
    try {
      await CrudCardApi(API_URL, ["", "", "", "", currentUser.data.key], "delete");
      successToastify("Deleted successfully");
      history.push("/");
    } catch (error) {
      errorToastify("Something went wrong, try again!");
    }
  };

  const likeHandler = async (e) => {
    e.preventDefault();
    if (e.currentTarget.className.baseVal.includes("isLiked")) {
      const deleted = await ConnectApiLikeDel(API_URL_LIKE_DELETE);
      if (deleted?.status < 300) setLiked(!liked);
    } else {
      const posted = await LikeViewApi(API_URL_LIKE, [cardDetail.id, currentUser.data.user.id, currentUser.data.key], "post");
      if (posted?.status < 300) setLiked(!liked);
    }
  };

  const LikeCounter = () => {
    let counter_list = 0;
    dataStateLike[0].data?.map((e) => {
      if (cardDetail.id === e.card) {
        counter_list++;
      }
    });
    return counter_list;
  };

  const dbLikeRecord = (item) => {
    return dataStateLike[0].data.map((e) => {
      if (item.id === e.card && currentUser.data.user.id === e.user) {
        return classes.isLiked;
      }
    });
  };

  const CommentHandler = () => setComments(!comments);

  const CommentPoster = async (e) => {
    e.preventDefault();
    const { content } = e.target;
    console.log("eeee: ", content.value);
    try {
      const CommentCatcher = await PostComment(API_URL_COMMENT, [content.value, currentUser?.data.user.id, cardDetail.id, currentUser.data.key], "post");
      e.target.content.value = "";
      window.alert("your comment has been added👍");
      return CommentCatcher;
    } catch (error) {
      return error;
    }
  };

  return (
    <Grid display="flex" justifyContent="center">
      <Box maxWidth="md" sx={{ borderRadius: 3, boxShadow: "10px 10px 4px grey", backgroundColor: "#fff", my: 15 }}>
        <Box sx={{ backgroundColor: "#E9E9E9" }}>
          <Grid component="img" src={cardDetail?.image_url} width="100%" borderRadius="10px 10px 0 0" maxHeight="400px" sx={{ objectFit: "fill" }} />
          <Typography margin={1} sx={{ color: "#046582", fontFamily: "Girassol", fontWeight: "bolder", textTransform: "uppercase" }}>
            {cardDetail.title}
          </Typography>
          <Typography variant="subtitle2" paddingX={1}>
            {cardDetail.date}
          </Typography>
          <Grid paddingX={1} height="auto">
            {cardDetail.content}
          </Grid>
        </Box>
        <Grid marginX={1} marginTop={1.1}>
          <AccountBoxIcon color="inherit" sx={{ fontSize: "40px", verticalAlign: "-15px" }} />
          <Typography display="inline" marginLeft={1} fontSize={22}>
            <code>{cardDetail.user.toUpperCase()}</code>
          </Typography>
        </Grid>

        <Grid>
          {currentUser.data.user.username === cardDetail.user ? (
            <center>
              <ButtonGroup variant="contained" size="large" sx={{ display: "flex", p: "10px", width: "40%" }}>
                <Button color="secondary" startIcon={<UpdateIcon color="primary" />} onClick={() => history.push(`/updatecard/${cardDetail.title.replace(" ", "")}`)}>
                  Update
                </Button>
                <Button
                  color="primary"
                  endIcon={<DeleteIcon color="secondary" />}
                  onClick={() => {
                    if (window.confirm("Are you sure bro?")) DeleteCard();
                  }}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </center>
          ) : null}
        </Grid>
        <hr />
        <Grid marginX={1.5} marginY={1.5}>
          <FavoriteIcon sx={{ fontSize: "40px", color: "#A1A1A1", "&:hover": { cursor: "pointer", color: "#B9B9B9" } }} onClick={(e) => likeHandler(e)} className={dbLikeRecord(cardDetail)} />
          <Box component="span" marginLeft={0.5} marginRight={2} fontSize={25} color="red">
            <code>
              <b style={{ verticalAlign: "13px" }}>{LikeCounter()}</b>
            </code>
          </Box>
          <CommentIcon onClick={CommentHandler} sx={{ marginX: "7px", fontSize: "38px", color: "#A1A1A1", "&:hover": { cursor: "pointer", color: "#B9B9B9" }, "&:active": { transform: "scale(1.2)", color: "#046582" } }} />
          <Box component="span" marginLeft={0} marginRight={2} fontSize={25} color="red">
            <code>
              <b style={{ verticalAlign: "13px" }}>{cardDetail.comment_count}</b>
            </code>
          </Box>
          <VisibilityIcon sx={{ fontSize: "43px", color: "#A1A1A1" }} />
          <Box component="span" marginLeft={0.7} marginRight={1} fontSize={25} color="red">
            <code>
              <b style={{ verticalAlign: "13px" }}>{cardDetail.view_count}</b>
            </code>
          </Box>
        </Grid>
        <Grid>
          {comments ? (
            <>
              <hr />
              <Box component="form" onSubmit={CommentPoster} sx={{ mt: 1, mb: 2, mx: 3, method: "POST" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField fullWidth multiline rows={5} id="content" variant="filled" label="Comment" name="content" required />
                  </Grid>
                </Grid>
                <center>
                  <Button type="submit" variant="contained" sx={{ my: 0.5, bgcolor: "#046582", "&:hover": { bgcolor: "#808080" }, fontWeight: "bold" }}>
                    SEND
                  </Button>
                </center>
              </Box>
              <hr />
              {commentData[0]?.data.map((e) => {
                if (e.card === cardDetail.id) {
                  return (
                    <Box sx={{ my: 3, mx: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField value={e.content} fullWidth multiline id={e.id} variant="outlined" label={`Posted ${e.timesince} ago by ${e.user}`} name="content" />
                        </Grid>
                      </Grid>
                    </Box>
                  );
                }
              })}
            </>
          ) : null}
        </Grid>
      </Box>
    </Grid>
  );
};

export default DetailsCard;
