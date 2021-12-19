import { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const ConnectApi = (url) => {
  // const [fetch, setFetch] = useState({isFetching: false})
  const [dataState, setDataState] = useState({ data: [] });
  // const [apiurl] = useState(url)
  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        // setFetch({isFetching: true})
        const response = await axios.get(url);
        setDataState({ ...dataState, data: response.data });
      } catch (error) {
        // setFetch({...fetch, isFetching: true})
        console.log(error);
      }
      setLoading(false);
    };
    fetchDataFromApi();
  }, [url]);
  return [dataState];
};

export const ConnectApiLikeDel = async (url_like) => {
  try {
    const response_like = await axios.delete(url_like);
    return response_like;
  } catch (error) {
    console.log(error);
  }
};

export const ConnectApiLike = (url_like) => {
  const [dataStateLike, setDataStateLike] = useState({ data: [] });

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response_like = await axios.get(url_like);
        setDataStateLike({ ...dataStateLike, data: response_like.data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataFromApi();
  }, []);
  return [dataStateLike];
};



export const RegisterApi = async (url, data) => {
  console.log(data);
  try {
    const response = await axios({
      method: "post",
      url: url,
      data: {
        username: data.userName,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        password2: data.password2,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const LoginApi = async (url, data) => {
  console.log(data);
  try {
    const response = await axios({
      method: "post",
      url: url,
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const LogoutApi = async (url) => {
  try {
    const response = await axios.post(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateUserApi = async (url, data, key) => {
  console.log(data);
  console.log("keeeeey: ", key);
  try {
    const response = await axios({
      method: "put",
      url: url,
      data: {
        username: data[0].userName,
        email: data[0].email,
        first_name: data[0].firstName,
        last_name: data[0].lastName,
      },
      headers: { Authorization: `Token ${key}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const CrudCardApi = async (url, data, method) => {
  console.log("method: ", method);
  console.log("datacrud: ", data);
  try {
    const response = await axios({
      method: method,
      url: url,
      data: {
        title: data[0],
        image_url: data[1],
        content: data[2],
        user_id: data[3],
      },
      headers: { Authorization: `Token ${data[4]}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const LikeViewApi = async (url, data, method) => {
  console.log("like: ", method);
  console.log("like: ", data);
  try {
    const response = await axios({
      method: method,
      url: url,
      data: {
        user: data[1],
        card: data[0],
      },
      headers: { Authorization: `Token ${data[2]}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const ViewedCardApi = async (url, data, method) => {
  // console.log("view: ", method);
  // console.log("view: ", data);
  try {
    const response = await axios({
      method: method,
      url: url,
      data: {
        user: data[0],
        card: data[1],
      },
      headers: { Authorization: `Token ${data[2]}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const CommentCardApi = (url, data, method) => {
  console.log("view: ", method);
  console.log("view: ", data);
  const [dataState, setDataState] = useState({ data: [] });

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await axios({
          method: method,
          url: url,
          data: {
            content: data[0],
            user: data[1],
            card: data[2],
          },
          headers: { Authorization: `Token ${data[3]}` },
        });
        setDataState({ ...dataState, data: response.data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataFromApi();
  }, []);
  return [dataState];
};

export const PostComment = async (url, data, method) => {
  console.log("view: ", method);
  console.log("view: ", data);

  try {
    const response = await axios({
      method: method,
      url: url,
      data: {
        content: data[0],
        user_id: data[1],
        card: data[2],
      },
      headers: { Authorization: `Token ${data[3]}` },
    });
    return response
  } catch (error) {
    console.log(error);
    return error
  }
};
