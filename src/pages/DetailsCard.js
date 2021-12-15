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
import { CrudCardApi, ConnectApiLikeDel, LikeViewApi, ConnectApiLike } from "../api/ConnectApi";
import { successToastify, errorToastify } from "../styling/toastify";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  isLiked: {
    fontSize: "48px",
    color: "#CC0000",
    "&:hover": { cursor: "pointer" }
  },
  isNotLiked: {
    fontSize: "40px",
    color: "#A1A1A1",
    "&:hover": { cursor: "pointer", color: "#B9B9B9" },
  },
}))

const DetailsCard = () => {
  const { cardDetail, currentUser } = useContext(AuthContext);
  console.log('hangisi: ', cardDetail)

  const API_URL = "https://dj-react-capstone-project.herokuapp.com/cards/" + cardDetail.id + "/";
  const API_URL_LIKE = "https://dj-react-capstone-project.herokuapp.com/liked/"
  const history = useHistory();
  const [liked, setLiked] = useState(false)
  const classes = useStyles();
  const dataStateLike = ConnectApiLike(API_URL_LIKE);

useEffect(() => {

}, [])

  let id;
  dataStateLike[0].data?.map((e) => 
    cardDetail.id === e.card && currentUser?.data.user.id === e.user ?  id = e.id : null
    )
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
    console.log('likehandler :', )
    e.currentTarget.className.baseVal.includes('isNotLiked') ?
      await LikeViewApi(API_URL_LIKE, [cardDetail.id, currentUser.data.user.id,currentUser.data.key], 'post')
    :
      await ConnectApiLikeDel(API_URL_LIKE_DELETE)
    setLiked(!liked)
  }

  console.log('dbbb: ', cardDetail)
  const dbLikeRecord = () => {
    dataStateLike[0].data?.map((e) => {
      if (cardDetail.id === e.card && currentUser?.data.user.id === e.user) {
        return classes.isLiked
      } else {
        return classes.isNotLiked
      }
    })
    // if (liked) {
    //   return classes.isLiked
    // } else {
    //   return classes.isNotLiked
    // }
}

const LikeCounter = () => {
  let counter_list = 0
  dataStateLike[0].data?.map((e) => {
      if (cardDetail.id === e.card) {
          counter_list++
      }
  })
  return counter_list      
}

  return (
    <Grid display="flex" justifyContent="center">
      <Box maxWidth="md" sx={{ borderRadius: 3, boxShadow: "10px 10px 4px grey", backgroundColor: "#fff", mt: 15 }}>
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
            {/* <code>{cardDetail.user.toUpperCase()}</code> */}
            <code>{cardDetail.user}</code>
          </Typography>
        </Grid>

        <Grid>
          {currentUser.data.user.username === cardDetail.user ? (
            <center>
              <ButtonGroup variant="contained" size="large"  sx={{ display: "flex", p: "10px", width: "40%" }}>
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
          <FavoriteIcon onClick={(e) => likeHandler(e)} className = {liked ? classes.isLiked : classes.isNotLiked} />
          <Box component="span" marginLeft={0.5} marginRight={2} fontSize={25} color="red">
            <code>
              <b style={{ verticalAlign: "13px" }}>{LikeCounter()}</b>
            </code>
          </Box>
          <CommentIcon sx={{ marginX: "7px", fontSize: "38px", color: "#A1A1A1", "&:hover": { cursor: "pointer", color: "#B9B9B9" }, "&:active": { transform: "scale(1.2)", color: "#046582" } }} />
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
      </Box>
    </Grid>
  );
};

export default DetailsCard;
