import React, { useState } from "react";
import { Button } from "@material-ui/core";
import VideoPlayer from "./VideoPlayer";
import { ContextProvider } from "../contexts/Servercontex";
import { useHistory } from "react-router-dom";
import { Close } from "@material-ui/icons";

const VideoCall = () => {
  const [startVC, setStartVC] = useState(false); //This is used to check if video call is started or not
  const history = useHistory(); //This is for redirecting when we close
  return (
    <>
      {!startVC && (
        <>
          <Button
            style={{
              marginRight: "5px",
              position: "absolute",
              right: "0px",
              top: "0px",
            }}
            variant="contained"
            color="secondary"
            onClick={() => history.push("/")}
          >
            <Close />
          </Button>
          <div
            className="loginContainer" //This is only visible till we have not started the video call.
          >
            <Button
              style={{ fontSize: "15px" }}
              variant="contained"
              color="primary"
              onClick={() => setStartVC(true)}
            >
              Start Video Call
            </Button>
          </div>
        </>
      )}
      {startVC && ( //This is the main video player which is visible once the video call is started.
        <ContextProvider>
          <div className="bgImg">
            <VideoPlayer />
          </div>
        </ContextProvider>
      )}
    </>
  );
};

export default VideoCall;
