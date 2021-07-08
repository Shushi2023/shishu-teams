import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/Authcontex";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { Navigation } from "./navigation";

const Login = () => {
  const emailRef = useRef(); //For storing Email
  const passRef = useRef(); //For storing pass
  const { logIn } = useAuth(); //Getting the login functionality from the Authcontex
  const [error, setError] = useState(); //For setting any errors if we get during login
  const [loading, setLoading] = useState(false); //For disabling the login button while loading
  const history = useHistory(); //For redirecting after login

  const handleSubmit = async (e) => {
    //Called when we login
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passRef.current.value);
      history.push("/");
    } catch (err) {
      setError("Failed to Sign In");
    }

    setLoading(false);
  };

  return (
    <>
      <Navigation />
      <div className="loginContainer">
        <form class="login" style={{ fontSize: "15px" }}>
          <h1>Login</h1>
          {error && ( //This is the error displayed if any
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Alert style={{ opacity: "100%" }} variant="danger">
                {error}
              </Alert>
            </div>
          )}
          <span class="form-input">
            <input type="text" placeholder="Email" required ref={emailRef} />
          </span>
          <span class="form-input">
            <input
              type="password"
              placeholder="Password"
              required
              ref={passRef}
            />
          </span>

          <button disabled={loading} class="form-button" onClick={handleSubmit}>
            Log In
          </button>
          <div className="w-100 text-center mt-3">
            <Link
              to="/forgotPassword" //This is the link to go to the forgotPassword. A mail is sent to the mail ID if we click on the forgot password
            >
              Forgot Password?
            </Link>
          </div>
          <div className="w-100 text-center mt-2" style={{ color: "white" }}>
            Need an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
