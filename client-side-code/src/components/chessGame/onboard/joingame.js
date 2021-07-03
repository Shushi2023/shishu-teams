import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const socket = require("../connection/socket").socket;

/**
 * 'Join game' is where we actually join the game room.
 */

const JoinGameRoom = (gameid, userName, isCreator) => {
  /**
   * For this browser instance, we want
   * to join it to a gameRoom. For now
   * assume that the game room exists
   * on the backend.
   *
   *
   * TODO: handle the case when the game room doesn't exist.
   */
  const idData = {
    gameId: gameid,
    userName: userName,
    isCreator: isCreator,
  };
  socket.emit("playerJoinGame", idData);
};

const JoinGame = (props) => {
  /**
   * Extract the 'gameId' from the URL.
   * the 'gameId' is the gameRoom ID.
   */
  const { gameid } = useParams();
  const history = useHistory();
  JoinGameRoom(gameid, props.userName, props.isCreator);
  return (
    <div>
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
    </div>
  );
};

export default JoinGame;
