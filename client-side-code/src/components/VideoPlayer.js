import React, { useContext, useState } from "react";
import { Button, Modal, Dialog } from "@material-ui/core";
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
  Close,
} from "@material-ui/icons";
import SideChat from "./embeddedChat/SideChat";
import Board from "./whiteboard/Board";

const VideoPlayer = () => {
  const {
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    shareScreen,
    me,
    leaveCall,
    callUser,
    answerCall,
  } = useContext(SocketContext); //Different functionalities and variables importing from the socketcontext.

  const [idToCall, setIdToCall] = useState(""); //For getting our call ID
  const [mute, setMute] = useState(true); //For muting and unmuting
  const [open, setOpen] = useState(false); //For opening/closing the modal
  const [openDialog, setOpenDialog] = useState(false); //For opening/closing the Whiteboard
  const useStyles = makeStyles((theme) => ({
    //This is used to stlye the modal
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
    //This is used to position the modal
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

  const handleOpenDialog = () => {
    //This is used to open the dialog box for whiteboard
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    //This is used to close the dialog box for whiteboard
    setOpenDialog(false);
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
            {call.isReceivingCall &&
            !callAccepted && ( //The answer button is only visible when we are receiving a call and it's not yet accepted
                <div
                  style={{ position: "absolute", bottom: "50%", right: "50%" }}
                >
                  <h1 styles={{ color: "white" }}>Someone is calling...</h1>
                  <Button // This is the answer button.
                    variant="contained"
                    color="primary"
                    onClick={answerCall}
                    style={{ position: "absolute", right: "50%" }}
                  >
                    Answer
                  </Button>
                </div>
              )}
            {!call.isReceivingCall &&
            !callAccepted && ( // Only visible when the call is not yet accepted and we are not receiving any call
                <>
                  <TextField //This is to display our ID
                    style={{
                      position: "absolute",
                      bottom: "54%",
                      right: "53%",
                    }}
                    value={me}
                    inputProps={{
                      style: { fontSize: 12, textDecoration: "none" },
                    }}
                  />
                  <CopyToClipboard text={me}>
                    <Button //This directly copies our ID to the clipboard and helps the user.
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
              <Button //We are allowed to make call only when we are not receiving the call and it's not accepted
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
              <Button //We can leave the call only if the call was accepted and it's not yet ended.
                style={{ borderRadius: "50%", marginRight: "5px" }}
                variant="contained"
                color="secondary"
                onClick={leaveCall}
              >
                <PhoneDisabled fontSize="large" />
              </Button>
            )}

            <Modal //This is the modal for modal when the user is asked to enter the ID and make a call
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.paper}>
                <TextField //Here the user need to enter the ID he needs to call
                  style={{ fontSize: "25px" }}
                  label="ID To Call"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                />
                <Button //By this button we can make the call
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
              <Button //This button helps us to toggle the mute button
                style={{ borderRadius: "50%", marginRight: "5px" }}
                variant="contained"
                color="primary"
                onClick={() => setMute(true)}
              >
                <Mic fontSize="large" />
              </Button>
            )}

            {callAccepted && !callEnded && mute && (
              <Button //This button helps us to toggle the mute button
                style={{ borderRadius: "50%", marginRight: "5px" }}
                variant="contained"
                color="secondary"
                onClick={() => setMute(false)}
              >
                <MicOff fontSize="large" />
              </Button>
            )}
            {callAccepted && !callEnded && (
              <Button //This button helps us to share the screen and it's allowed only when the call is accepted and it's not yet ended
                style={{ borderRadius: "50%", marginRight: "5px" }}
                variant="contained"
                color="primary"
                onClick={shareScreen}
              >
                <ScreenShare fontSize="large" />
              </Button>
            )}
            {callAccepted &&
            !callEnded && ( //Whiteboard functionality is possible only when the call is made and not yet ended.
                <>
                  <Button
                    style={{ marginRight: "5px" }}
                    variant="contained"
                    color="primary"
                    onClick={handleOpenDialog}
                  >
                    Let's Draw
                  </Button>
                  <Dialog //This is the dialog box that comes only when we try to use the whiteboard functionality.
                    fullScreen
                    open={openDialog}
                    onClose={handleCloseDialog}
                  >
                    <Board />
                    <Button
                      style={{
                        marginRight: "5px",
                        position: "absolute",
                        right: "0px",
                        top: "0px",
                      }}
                      variant="contained"
                      color="secondary"
                      onClick={handleCloseDialog}
                    >
                      <Close />
                    </Button>
                  </Dialog>
                </>
              )}
          </div>
          {callAccepted &&
          !callEnded && ( //This displays the video of the person whom we have called.
              <video
                style={{ width: "100%", border: "1px solid black" }}
                ref={userVideo}
                autoPlay
                controls
              />
            )}
          {stream && (
            <video //This is our video.
              className="MyVideo"
              style={{ height: "200px" }}
              ref={myVideo}
              autoPlay
              muted={mute}
              controls
            />
          )}
        </div>
        <div //This is the sidechat component which is only visible during the video call.
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
