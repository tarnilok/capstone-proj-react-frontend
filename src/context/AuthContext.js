import { createContext, useState, useEffect } from "react";
// import { userObserver } from "../auth/firebase";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [cardDetail, setCardDetail] = useState({});
  const [loading, setLoading ] = useState(true)

  useEffect(() => {
    ;
  }, []); 

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
