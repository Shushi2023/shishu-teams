import React, { useContext, useState } from "react";
import { Button, Modal } from "@material-ui/core";
import { SocketContext } from "../contexts/Servercontex";
import "./styles.css";
import { Navigation } from "./navigation";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Assignment,
  Phone,
  PhoneDisabled,
  Mic,
  MicOff,
  ScreenShare,
} from "@material-ui/icons";
import SideChat from "./embeddedChat/SideChat";

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    shareScreen,
    me,
    setName,
    leaveCall,
    callUser,
    answerCall,
  } = useContext(SocketContext);

  const [idToCall, setIdToCall] = useState(""); //For getting our call ID
  const [mute, setMute] = useState(true); //For muting and unmuting
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

  return (
    <>
      {callEnded && <Navigation />}
      <div style={{ marginLeft: "0px", marginRight: "0px", maxWidth: "800px" }}>
        <div
          className="UserVideo"
          style={{ width: "75%", height: "100%", overflow: "hidden" }}
        >
          <div
            className="controls"
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              height: "5%",
              width: "100%",
            }}
          >
            {call.isReceivingCall && !callAccepted && (
              <div
                style={{ position: "absolute", bottom: "50%", right: "50%" }}
              >
                <h1>Someone is calling...</h1>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={answerCall}
                  style={{ position: "absolute", right: "50%" }}
                >
                  Answer
                </Button>
              </div>
            )}
            {!call.isReceivingCall && !callAccepted && (
              <>
                <TextField
                  style={{ position: "absolute", bottom: "54%", right: "53%" }}
                  value={me}
                  inputProps={{
                    style: { fontSize: 12, textDecoration: "none" },
                  }}
                />
                <CopyToClipboard text={me}>
                  <Button
                    style={{
                      marginRight: "5px",
                      position: "absolute",
                      bottom: "50%",
                      right: "50%",
                    }}
                    variant="contained"
                    color="primary"
                    startIcon={<Assignment fontSize="large" />}
                  >
                    Copy Your ID To Clipboard
                  </Button>
                </CopyToClipboard>
              </>
            )}
            {!call.isReceivingCall && !callAccepted && (
              <Button
                style={{
                  marginRight: "5px",
                  position: "absolute",
                  bottom: "50%",
                  right: "30%",
                }}
                variant="contained"
                color="primary"
                onClick={handleOpen}
                startIcon={<Phone fontSize="large" />}
              >
                Let's Make a call
              </Button>
            )}
            {callAccepted && !callEnded && (
              <Button
                style={{ borderRadius: "50%", marginRight: "5px" }}
                variant="contained"
                color="secondary"
                onClick={leaveCall}
              >
                <PhoneDisabled fontSize="large" />
              </Button>
            )}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.paper}>
                <TextField
                  style={{ fontSize: "25px" }}
                  label="ID To Call"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                />
                <Button
                  style={{ marginRight: "5px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    callUser(idToCall);
                    handleClose();
                  }}
                  startIcon={<Phone fontSize="large" />}
                >
                  Call
                </Button>
              </div>
            </Modal>
            {callAccepted && !callEnded && !mute && (
              <Button
                style={{ borderRadius: "50%", marginRight: "5px" }}
                variant="contained"
                color="primary"
                onClick={() => setMute(true)}
              >
                <Mic fontSize="large" />
              </Button>
            )}
            {callAccepted && !callEnded && mute && (
              <Button
                style={{ borderRadius: "50%", marginRight: "5px" }}
                variant="contained"
                color="secondary"
                onClick={() => setMute(false)}
              >
                <MicOff fontSize="large" />
              </Button>
            )}
            {callAccepted && !callEnded && (
              <Button
                style={{ borderRadius: "50%", marginRight: "5px" }}
                variant="contained"
                color="primary"
                onClick={shareScreen}
              >
                <ScreenShare fontSize="large" />
              </Button>
            )}
          </div>
          {callAccepted && !callEnded && (
            <video
              style={{ width: "100%", border: "1px solid black" }}
              ref={userVideo}
              autoPlay
            />
          )}
          {stream && (
            <video
              className="MyVideo"
              style={{ height: "200px" }}
              ref={myVideo}
              autoPlay
              muted={mute}
            />
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            right: "0px",
            width: "25%",
            height: "100%",
          }}
        >
          {callAccepted && !callEnded && <SideChat />}
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
