import React from "react";
import JoinGame from "./joingame";
import ChessGame from "../chess/ui/chessgame";
import "../chess.css";

/**
 * Onboard is where we create the game room.
 */

class JoinRoom extends React.Component {
  state = {
    didGetUserName: false,
    inputText: "",
  };

  constructor(props) {
    super(props);
    this.textArea = React.createRef();
  }

  typingUserName = () => {
    // grab the input text from the field from the DOM
    const typedText = this.textArea.current.value;

    // set the state with that text
    this.setState({
      inputText: typedText,
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.didGetUserName ? (
          <React.Fragment>
            <JoinGame userName={this.state.inputText} isCreator={false} />
            <ChessGame myUserName={this.state.inputText} />
          </React.Fragment>
        ) : (
          <div className="glassMorphism">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <h1 style={{ marginTop: "14%", color: "black" }}>
                Your Username:
              </h1>

              <input
                style={{ marginTop: "14%" }}
                ref={this.textArea}
                onInput={this.typingUserName}
              ></input>

              <button
                className="btn btn-primary"
                style={{ marginTop: "14%" }}
                disabled={!(this.state.inputText.length > 0)}
                onClick={() => {
                  // When the 'Submit' button gets pressed from the username screen,
                  // We should send a request to the server to create a new room with
                  // the uuid we generate here.
                  this.setState({
                    didGetUserName: true,
                  });
                }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default JoinRoom;
