import { Navbar } from "react-bootstrap";
import { Button, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useAuth } from "../contexts/Authcontex";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
export const Navigation = (props) => {
  const [error, setError] = useState(); //This is used to set the error if the login/signup fails
  const { logOut, currUser } = useAuth(); //Importing the logOut function and the current user from the AuthContex
  const history = useHistory(); //This is used to redirect

  const [open, setOpen] = useState(false); //For opening and closing the modal
  const useStyles = makeStyles((theme) => ({
    paper: {
      //For styling the paper
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "flex",
      justifyContent: "space-between",
    },
  }));
  const getModalStyle = () => {
    //For giving position to the modal
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  };

  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const handleOpen = () => {
    //For opening the modal
    setOpen(true);
  };

  const handleClose = () => {
    //For closing the modal
    setOpen(false);
  };

  const handleLogout = async () => {
    setError("");
    try {
      await logOut();
      history.push("/");
      window.location.reload();
    } catch (err) {
      setError("Failed to Log");
    }
  };
  return (
    <Navbar
      id="menu"
      className="navbar-default navbar-fixed-top bg-dark"
      style={{ marginBottom: "0px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ height: "100%" }}>
          <a
            style={{
              fontFamily: "Stylish",
              color: "white",
              textDecoration: "none",
              fontSize: "30px",
              height: "100%",
            }}
            href="/"
          >
            Shishu Teams
          </a>
        </div>

        <ul className=" nav navbar-nav navbar-right d-flex justify-content-between">
          <li className="d-flex flex-row">
            <a onClick={handleOpen} style={{ textDecoration: "none" }}>
              Features
            </a>
            <a
              onClick={() => history.push("/")}
              style={{ textDecoration: "none" }}
            >
              About
            </a>
            <Modal //This is our features modal which includes all the features.
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.paper}>
                <div class="featureContainer">
                  <div class="VideoCall">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        history.push("/parentVC");
                      }}
                    >
                      Let's Video Chat
                    </Button>
                  </div>
                  <div class="news">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        history.push("/news");
                      }}
                    >
                      Search News
                    </Button>
                  </div>
                  <div class="YTPlayer">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        history.push("/youtube");
                      }}
                    >
                      Youtube Room
                    </Button>
                  </div>
                  <div class="Chess">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        history.push("/playChess");
                      }}
                    >
                      Let's Play Chess
                    </Button>
                  </div>
                  <div class="Chat">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        history.push("/chat");
                      }}
                    >
                      Chat Room
                    </Button>
                  </div>
                  <div class="Stream">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        history.push("/stream");
                      }}
                    >
                      Join Stream
                    </Button>
                  </div>
                  <div class="Calendar">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        history.push("/calendar");
                      }}
                    >
                      Calendar
                    </Button>
                  </div>
                  <div class="website">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        history.push("/website");
                      }}
                    >
                      Website
                    </Button>
                  </div>
                  <div class="closeButton">
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={handleClose}
                      startIcon={<Close />}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          </li>

          <li>
            {!currUser && (
              <span style={{ marginRight: "10px" }}>
                <Button //This is our login button which is only visible if a user is not logged in.
                  style={{ fontSize: "15px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/login")}
                >
                  Log In
                </Button>
              </span>
            )}

            {!currUser && (
              <span style={{ marginRight: "10px" }}>
                <Button //This is the signup button which is only visible only if the user is not logged in.
                  style={{ fontSize: "15px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/signup")}
                >
                  Sign Up
                </Button>
              </span>
            )}

            {currUser && (
              <span>
                <Button //This is the log out button which is visible only when the user is logged in.
                  style={{ fontSize: "15px" }}
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </span>
            )}
          </li>
        </ul>
      </div>
    </Navbar>
  );
};
