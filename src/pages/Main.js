import { ConnectApi, ViewedCardApi } from "../api/ConnectApi";
import React, { useContext, useState } from "react";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { LikeCommentView } from "../components/LikeCommentView";
import Pagination from "@mui/material/Pagination";

const Main = () => {
  const { loading, currentUser, setCardDetail } = useContext(AuthContext);
  const history = useHistory();
  const [pageNumber, SetPageNumber] = useState(1);
  
  
  const per_page = 4;
  const API_URL = `https://dj-react-capstone-project.herokuapp.com/cards/?page=${pageNumber}&per_page=${per_page}`;
  const API_URL_VIEW = "https://dj-react-capstone-project.herokuapp.com/viewed/";

  let dataState = ConnectApi(API_URL);

  const fetchCards = (e) => {
    SetPageNumber(Number(e.target.textContent) || (e.target?.innerHTML.includes('M15') ? pageNumber-1 : pageNumber+1));   
  };

  async function handleDetails(e) {
    if (currentUser) {
      try {
        await ViewedCardApi(API_URL_VIEW, [currentUser.data.user.id, e.id, currentUser.data.key], "post");
      } catch (error) {
        return error;
      }
      localStorage.setItem('e', JSON.stringify(e))
      setCardDetail(e);
      history.push(`detailcard/${e.title.replace(" ", "")}`);
    } else {
      alert("Please log in first to dive the deepness of my blogpage😁");
      history.push("/login");
    }
  }

  return (
    <Box sx={{ backgroundImage: "linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%)", paddingY: "110px" }} minHeight="75.9vh">
      <Typography textAlign="center" sx={{ fontSize: "44px", fontFamily: "Girassol", fontWeight: "bolder", color: "#046582", "@media(max-width:600px)": { fontSize: "1.7rem" }, mt: "20px", mb: "60px" }}>{`─── DASHBOARD ───`}</Typography>
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
                        <code>
                          <b>Created:</b> {item.createdDate.substr(0, 10)}
                        </code>
                      </Typography>
                    ) : (
                      <Typography variant="subtitle2" paddingX={1}>
                        <code>
                          <b>Updated:</b> {item.updatedDate.substr(0, 10)}
                        </code>
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
                  <LikeCommentView item={item} />
                </Box>
              );
            })}
          </Grid>
          <Box width="100%">
            <Pagination onChange={(e) => fetchCards(e)}  content='next' count={Math.ceil(dataState[0].data.count / per_page)} color="secondary" size="large" sx={{ display: "flex", justifyContent: "center" }} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Main;
