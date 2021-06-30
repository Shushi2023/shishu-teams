import React, { useState } from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

import VideoPlayer from './VideoPlayer';
import Sidebar from './Sidebar';
import Notifications from './Notifications';
import { ContextProvider } from '../contexts/Servercontex';
import { Navigation } from './navigation';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const VideoCall = () => {
  const classes = useStyles();
  const [startVC, setStartVC] = useState(false);
  
  return (
    <>
    <Navigation />
    {!startVC && (<div style = {{minHeight : "100vh", display : "flex", justifyContent : "center", alignItems : "center"}}>
      <Button style = {{fontSize : "15px"}} variant="contained" color="primary" onClick={() => setStartVC(true)}>
        Start Video Call
      </Button>
    </div>)}
    {startVC && (<ContextProvider>
      <div className={classes.wrapper}>
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography variant="h2" align="center">Video Chat</Typography>
        </AppBar>
        <VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
      </div>
    </ContextProvider>)}
    </>
  );
};

export default VideoCall;
