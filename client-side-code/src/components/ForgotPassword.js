import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/Authcontex";
import { Link } from "react-router-dom";
import { Navigation } from "./navigation";

const ForgotPassword = () => {
  //This is the forgot password component.
  const emailRef = useRef(); //Used get the email
  const { resetPassword } = useAuth(); //resetPassword method is imported from the Authcontex
  const [error, setError] = useState(); //To set the error if we get any
  const [message, setMessage] = useState(); //To set the message once the mail is sent
  const [loading, setLoading] = useState(false); //Disabling the button while loading.

  const handleSubmit = async (e) => {
    //Called when we click on the Reset password button.
    e.preventDefault(); //Prevents the default behaviour of the form.
    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your email for further instructions");
    } catch (err) {
      setError("Failed to reset password");
    }

    setLoading(false);
  };

  return (
    <>
      <Navigation />
      <div className="loginContainer">
        <form class="login" style={{ fontSize: "15px" }}>
          <h1>Password Reset</h1>
          {error && (
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
          {message && (
            <Alert style={{ opacity: "100%" }} variant="success">
              {message}
            </Alert>
          )}
          <span class="form-input">
            <input type="text" placeholder="Email" required ref={emailRef} />
          </span>
          <button class="form-button" onClick={handleSubmit}>
            Reset Password
          </button>
          <div className="w-100 text-center mt-2" style={{ color: "white" }}>
            <Link to="/login">Log In</Link>
          </div>
          <div className="w-100 text-center mt-2" style={{ color: "white" }}>
            Need an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
