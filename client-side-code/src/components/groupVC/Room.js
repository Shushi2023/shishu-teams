import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};
const socket = io("http://localhost:5001");
// const socket = io("https://shishu-teams.herokuapp.com");

const Room = (props) => {
  const [peers, setPeers] = useState([]); //This is for setting the people in group chat
  const history = useHistory(); //For redirecting when we close
  const userVideo = useRef(); //Our video
  const peersRef = useRef([]); //Video of the other users in chat
  const roomID = props.match.params.roomID; //This is the room ID for our video room
  useEffect(() => {
    //This is called only once
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true }) //Asking the browser for video and audio permissions
      .then((stream) => {
        userVideo.current.srcObject = stream; //Setting our video to the current video stream
        socket.emit("join room", roomID);
        socket.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            //Iterating over all the other users in chat
            const peer = createPeer(userID, socket.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socket.on("user joined", (payload) => {
          //Called when a peer joins the call
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socket.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    //For creating a peer.
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("sending signal", { userToSignal, callerID, signal });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    //For adding a peer.
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div class="bgImg">
      <h1 style={{ color: "white", maxHeight: "25px" }}>
        Share the Link In URL to Invite Others to this Room
      </h1>

      <Container>
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
        {peers.map((peer, index) => {
          //Displaying our video using StyledVideo and other people videos using this map function
          return <Video key={index} peer={peer} />;
        })}
        <Button
          style={{
            marginRight: "5px",
            position: "absolute",
            right: "0px",
            top: "0px",
          }}
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push("/");
            window.location.reload();
          }}
        >
          <Close />
        </Button>
      </Container>
    </div>
  );
};

export default Room;
