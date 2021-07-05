import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/Authcontex";
import { Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
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

      {/* <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "300px"}}>
                <Card>
                    <Card.Body>
                        <h2 className = "text-center mb-4">Password Reset</h2>
                        {error && <Alert style = {{opacity : "100%"}} variant = "danger">{error}</Alert>}
                        {message && <Alert style = {{opacity : "100%"}} variant = "success">{message}</Alert>}
                        <Form onSubmit = {handleSubmit}>
                            <Form.Group id = "email" className = "input-group">
                                <span class="input-group-text" id="basic-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                    </svg>
                                </span>
                                <Form.Control type = "email" ref = { emailRef } required placeholder = "Email" /> 
                            </Form.Group>
                            
                            <Button className = "w-100 mt-2" disabled = {loading} type = "submit">Reset Password</Button>
                        </Form>
                        <div className = "w-100 text-center mt-3">
                            <Link to = "/login">Log In</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className = "w-100 text-center mt-2">
                    Need an account? <Link to = "/signup">Sign up</Link>
                </div>
            </div>
        </Container> */}
    </>
  );
};

export default ForgotPassword;
