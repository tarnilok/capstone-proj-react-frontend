import { createContext, useState, useEffect } from "react";
// import { userObserver } from "../auth/firebase";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('userCredential')) || null);
  const [cardDetail, setCardDetail] = useState({});
  const [loading, setLoading ] = useState(true)

  const values = {
    setCurrentUser,
    currentUser,
    setCardDetail,
    cardDetail,
    loading,
    setLoading,
  };
  return <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>;
}

export default AuthContextProvider;
