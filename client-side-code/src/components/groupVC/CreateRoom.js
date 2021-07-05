import React from "react";
import { v1 as uuid } from "uuid";
import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
//This is used to create a room for group video call
const CreateRoom = (props) => {
  const history = useHistory(); //This is for redirecting when we click on close button

  function create() {
    const id = uuid(); //We create a random ID for setting a URL for group chat
    props.history.push(`/groupVC/room/${id}`);
  }

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
        }}
      >
        <Close />
      </Button>
      <div class="bgImg">
        <Button //Clicking this button will create a room
          style={{
            marginRight: "5px",
            position: "absolute",
            right: "50%",
            top: "50%",
          }}
          variant="contained"
          color="secondary"
          onClick={create}
        >
          Create Room
        </Button>
      </div>
    </div>
  );
};

export default CreateRoom;
