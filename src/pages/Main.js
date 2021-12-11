import { ConnectApi } from "../api/ConnectApi";
import React, { useContext} from "react";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from '@mui/icons-material/Visibility';

const Main = () => {
  const { loading, currentUser } = useContext(AuthContext);
  const API_URL = "https://dj-react-capstone-project.herokuapp.com/cards/";
  const dataState = ConnectApi(API_URL);
  console.log(dataState);
  console.log("currentuser: ", currentUser);

  const history = useHistory();
  const { setCardDetail } = useContext(AuthContext);

  const handleDetails = (e) => {
    console.log("veri: ", e);
    if (currentUser) {
      setCardDetail(e);
      history.push(`detailcard/${e.title.replace(" ", "")}`);
    } else {
      alert("Please log in first to dive the deepness of my blogpage😁");
      history.push("/login");
    }
  };
  return (
    <Box sx={{ backgroundImage: "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)", paddingY: "90px" }} minHeight="100vh">
      <Typography textAlign="center" sx={{ fontSize: "40px", fontFamily: "Girassol", fontWeight: "bolder", color: "#046582", "@media(max-width:600px)": { fontSize: "1.7rem" } }}>{`─── DASHBOARD ───`}</Typography>

      {loading ? (
        <Stack sx={{ display: "flex", justifyContent: "center", mt: "50px" }} direction="row">
          <CircularProgress color="success" size="7rem" />
        </Stack>
      ) : (
        <Box>
          <Grid item container>
            {dataState[0].data.results?.map((item) => {

              return (
                <Box key={item?.id} width="400px" flexShrink="1" sx={{ borderRadius: 3, boxShadow: "10px 10px 4px grey", backgroundColor: "#fff", mx: "35px", mb: "45px" }}>
                  <Box variant="button" onClick={() => handleDetails(item)} sx={{ "&:hover": { cursor: "pointer" }, backgroundColor: "#E9E9E9" }}>
                    <Grid component="img" src={item?.image_url} width="100%" height="200px" borderRadius="10px 10px 0 0" sx={{ objectFit: "cover" }} />
                    <Typography margin={1} sx={{ color: "#046582", fontFamily: "Girassol", fontWeight: "bolder", textTransform: "uppercase", overflow: "hidden", display: "-webkit-box", "-webkit-line-clamp": "1", "-webkit-box-orient": "vertical" }}>
                      {item.title}
                    </Typography>
                    {item.createdDate.substr(0, 20) === item.updatedDate.substr(0, 20) ? (
                      <Typography variant="subtitle2" paddingX={1}>
                        <code><b>Created:</b> {item.createdDate.substr(0, 10)}</code>
                      </Typography>
                    ) : (
                      <Typography variant="subtitle2" paddingX={1}>
                        <code><b>Updated:</b> {item.updatedDate.substr(0, 10)}</code>
                      </Typography>
                    )}
                    <Grid paddingX={1} height={45} sx={{ overflow: "hidden", display: "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient": "vertical" }}>
                      {item.content}
                    </Grid>
                  </Box>
                  <Grid marginX={1} marginTop={1.1}>
                    <AccountBoxIcon color="inherit" sx={{ fontSize: "40px", verticalAlign: "-15px" }} />
                    <Typography display="inline" marginLeft={1} fontSize={22}>
                      <code>{item.user.toUpperCase()}</code>
                    </Typography>
                  </Grid>
                  <Grid marginX={1.5} marginY={1.2}>
                    <FavoriteIcon sx={{ fontSize: "30px", color: "#A1A1A1" }} />
                    <Box component='span' marginLeft={.5} marginRight={2} fontSize={19} color='red'><code><b style={{verticalAlign: "10px"}}>{item.like_count}</b></code></Box>
                    <CommentIcon sx={{ marginX: "7px", fontSize: "29px", color: "#A1A1A1" }} />
                    <Box component='span' marginLeft={0} marginRight={2} fontSize={19} color='red'><code><b style={{verticalAlign: "10px"}}>{item.comment_count}</b></code></Box>
                    <VisibilityIcon sx={{ fontSize: "33px", color: "#A1A1A1" }} />
                    <Box component='span' marginLeft={.7} marginRight={2} fontSize={19} color='red'><code><b style={{verticalAlign: "10px"}}>{item.view_count}</b></code></Box>
                  </Grid>
                </Box>
              );
            })}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Main;
