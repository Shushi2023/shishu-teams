import firebase from "firebase/app";
import "firebase/auth";

const credentials = firebase.initializeApp({
  //This is for setting the firebase credentials for login, logout and reset password.
  //Note that none of the values are hardcoded to and stored in an env file to safeguard our app credentials.
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: "AIzaSyB3g4xq75osnS6nUctbNNXuXopEVegHBJM",
  authDomain: "shishu-auth-dev.firebaseapp.com",
  projectId: "shishu-auth-dev",
  storageBucket: "shishu-auth-dev.appspot.com",
  messagingSenderId: "18251348477",
  appId: "1:18251348477:web:be38df349c2f7c5fff4194",
});

export const auth = credentials.auth();
export default credentials;
