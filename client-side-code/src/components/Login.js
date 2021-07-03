import React, { useContext, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/Authcontex";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { Navigation } from "./navigation";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const { logIn, userName, setUserName } = useAuth();
  // const {setName} = useContext(SocketContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passRef.current.value);
      console.log("userName", userName);
      history.push("/parentVC");
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
          <span class="form-input">
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
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

          <button disabled={loading} class="form-button" onClick={handleSubmit}>
            Log In
          </button>
          <div className="w-100 text-center mt-3">
            <Link to="/forgotPassword">Forgot Password?</Link>
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
