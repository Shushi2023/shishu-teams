import React, { useContext, useState } from 'react';
import { Grid, Typography, Paper, makeStyles, Button } from '@material-ui/core';
import { SocketContext } from '../contexts/Servercontex';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, shareScreen } = useContext(SocketContext);
  const classes = useStyles();
  const [mute, setMute] = useState(false);

  
  
  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted={mute} ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
          <Button style = {{fontSize : "15px"}} variant="contained" color="primary" onClick={() => setMute(!mute)}>
            Mute
          </Button>
          <Button style = {{fontSize : "15px"}} variant="contained" color="primary" onClick={shareScreen}>
            Share Screen
          </Button>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
