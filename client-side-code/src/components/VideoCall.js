import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import VideoPlayer from "./VideoPlayer";
import { ContextProvider } from "../contexts/Servercontex";
import { Navigation } from "./navigation";

const VideoCall = () => {
  const [startVC, setStartVC] = useState(false);

  return (
    <>
      {!startVC && (
        <>
          <Navigation />
          <div className="loginContainer">
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
      {startVC && (
        <ContextProvider>
          <div>
            <VideoPlayer />
          </div>
        </ContextProvider>
      )}
    </>
  );
};

export default VideoCall;
