import React from "react";
import { v1 as uuid } from "uuid";
import { Navigation } from "../navigation";
import { Button } from "@material-ui/core";

const CreateRoom = (props) => {
  function create() {
    const id = uuid();
    props.history.push(`/groupVC/room/${id}`);
  }

  return (
    <div>
      <Navigation />
      <Button
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
  );
};

export default CreateRoom;
