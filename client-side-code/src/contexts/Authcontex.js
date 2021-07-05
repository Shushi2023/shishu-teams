import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext(); //Context is created here

export const useAuth = () => {
  return useContext(AuthContext); //Created a useAuth hook for calling the useContext
};

const AuthProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(); //For managing the current user
  const [loading, setLoading] = useState(true); //Used to render our application only when we have a user
  const [userName, setUserName] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrUser(user); //Setting the current user, it's called only once
      setLoading(false); // Setting the loading to false here means we are only rendering when we have a user
    });

    return unsubscribe; //Later we need to call this to unsubscribe the current user
  }, []); //Empty array here means that it will render only once

  const signUp = (email, password) => {
    //For signup
    return auth.createUserWithEmailAndPassword(email, password); //Returns a PROMISE
  };

  const logIn = (email, password) => {
    //For login
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logOut = () => {
    //For logout
    return auth.signOut();
  };

  const resetPassword = (email) => {
    //For resetting the password
    return auth.sendPasswordResetEmail(email);
  };

  const value = {
    //This will be the value returned
    currUser,
    signUp,
    logIn,
    logOut,
    resetPassword,
    userName,
    setUserName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children // Rendering our component only when we have a user
      }
    </AuthContext.Provider>
  );
};

export { AuthProvider };
