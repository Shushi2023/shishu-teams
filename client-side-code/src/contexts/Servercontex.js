import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5001");
// const socket = io("https://shishu-teams.herokuapp.com");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false); //For checking if we have accepted the call or not
  const [callEnded, setCallEnded] = useState(false); //To check if the call is ended or not
  const [stream, setStream] = useState(); //To set the stream object
  const [name, setName] = useState(""); //To set the name
  const [call, setCall] = useState({}); //To set the calling data
  const [me, setMe] = useState(""); //To set our data(basically our socket ID)
  const [message, setMessage] = useState(""); //The message we want to send while video calling in the sidechat
  const [chat, setChat] = useState([]); //To store the complete chat till any given time
  const scrollRef = useRef(); //To set the scrolling to be allowed only on the side chat and not on complete page
  const myVideo = useRef(); //To store my video
  const userVideo = useRef(); //To get the user's video
  const connectionRef = useRef();

  useEffect(() => {
    //This useEffect is for video calling and is called only once
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true }) //Asking chrome to allow video and audio
      .then((currentStream) => {
        setStream(currentStream); //Setting the current stream to stream
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    setMe(socket.id);

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  useEffect(() => {
    //This use effect is for the side chat during VC and is called on each render
    socket.on("message", (payload) => {
      setChat([...chat, payload]);
    });
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  const answerCall = () => {
    //When we answer a video call
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream }); //Creating a new peer.

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    //This is called when we want to make a call
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    //is called when the call is ended
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  const shareScreen = () => {
    //For sharing the screen while video calling
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        connectionRef.current.replaceTrack(
          stream.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          stream
        );
        myVideo.current.srcObject = screenStream;
        screenStream.getTracks()[0].onended = () => {
          connectionRef.current.replaceTrack(
            screenStream.getVideoTracks()[0],
            stream.getVideoTracks()[0],
            stream
          );
          myVideo.current.srcObject = stream;
        };
      });
  };

  const sendMessage = (e) => {
    //used to send message along side video call
    e.preventDefault();
    socket.emit("message", { message: message, id: socket.id });
    setMessage("");
  };

  const value = {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    shareScreen,
    message,
    setMessage,
    sendMessage,
    chat,
    scrollRef,
  };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
