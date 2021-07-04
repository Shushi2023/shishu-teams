import { Navbar } from "react-bootstrap";
import { Button, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useAuth } from "../contexts/Authcontex";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
export const Navigation = (props) => {
  const [error, setError] = useState();
  const { logOut, currUser } = useAuth();
  const history = useHistory();

  const [open, setOpen] = useState(false); //For opening/closing the modal
  const useStyles = makeStyles((theme) => ({
    paper: {
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
            <Modal
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
                      Let's Chat
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
                <Button
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
                <Button
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
                <Button
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
