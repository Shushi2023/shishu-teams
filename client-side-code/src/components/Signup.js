import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/Authcontex";
import { Link, useHistory } from "react-router-dom";
import { Navigation } from "./navigation";

const Signup = () => {
  const nameRef = useRef(); //This is for setting the username
  const emailRef = useRef(); //This is for setting the email
  const passRef = useRef(); //This is for setting the password
  const confPassRef = useRef(); //This is for setting the confirm password
  const { signUp } = useAuth(); //This is the signUp functionality imported from the Authcontex
  const [error, setError] = useState(); //This is used to tract the error.
  const [loading, setLoading] = useState(false); //This is for disabling the signUp button during the wait time.
  const history = useHistory(); //This is for redirectig if the signUp is successful

  const handleSubmit = async (e) => {
    //This is called when we signUp
    e.preventDefault();
    if (passRef.current.value !== confPassRef.current.value) {
      return setError("Passwords does not match");
    }
    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passRef.current.value);
      history.push("/");
    } catch (e) {
      setError(`${e.message}`);
    }
    setLoading(false);
  };

  return (
    <>
      <Navigation />
      <div className="loginContainer">
        <form class="login" style={{ fontSize: "15px" }}>
          <h1>Sign Up</h1>
          {error && ( //This is the error which is shown if there is any problem with signup
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
            <input type="text" placeholder="Username" required ref={nameRef} />
          </span>
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
          <span class="form-input">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              ref={confPassRef}
            />
          </span>
          <button class="form-button" disabled={loading} onClick={handleSubmit}>
            Sign Up
          </button>

          <div className="w-100 text-center mt-2" style={{ color: "white" }}>
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
