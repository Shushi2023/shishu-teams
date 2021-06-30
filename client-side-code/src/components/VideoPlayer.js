import React, { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../contexts/Servercontex';
import './styles.css';
import { Navigation } from './navigation';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, shareScreen } = useContext(SocketContext);
  const [mute, setMute] = useState(true);
  
  return (
    <>
      {(!callAccepted || callEnded) && <Navigation />}
      <div className="container" style = {{marginLeft : "0px", marginRight : "0px"}}>
        {callAccepted && !callEnded && (<div className="UserVideo" style = {{width : "100%", height : "500px", overflow : "hidden"}}><video style = {{width : "100%"}} muted={mute} ref={userVideo} autoPlay/></div>)}
        {(callAccepted && !callEnded) ? 
        <div className="Secondary-Video" style = {{backgroundColor : "black"}}>
          {stream && (<div className="MyVideo" style = {{width : "100%", height : "166px", overflow : "hidden"}}>
            <video style = {{width : "100%"}} className = "videoInsert" ref={myVideo} autoPlay/>
          </div>)}
        </div> :
        <div className="Secondary-Video">
          {stream && (<div className="MyVideo" style = {{width : "100%", height : "166px", overflow : "hidden"}}>
            <video style = {{width : "100%"}} className = "videoInsert" ref={myVideo} autoPlay/>
          </div>)}
        </div>}
      </div>
      {callAccepted && !callEnded && (<Button style = {{fontSize : "15px"}} variant="contained" color="primary" onClick={() => setMute(!mute)}>
        Mute
      </Button>)}
      {callAccepted && !callEnded && (<Button style = {{fontSize : "15px"}} variant="contained" color="primary" onClick={shareScreen}>
        Share Screen
      </Button>)}
    </>
  );
};

export default VideoPlayer;
