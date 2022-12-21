import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./stream.css";

const WatchStream = () => {
  //This is our stream component for watching stream on twitch
  const history = useHistory(); //Used for redirecing when we close.
  const [flag, setFlag] = useState(false); //To view stream only when the username is entered
  const [val, setVal] = useState(""); //For setting the username to view the stream
  const [username, setUsername] = useState("");

  const search = (e) => {
    e.preventDefault();
    setFlag(true);
    setUsername(val);
  };
  return (
    <>
      {!flag && (
        <div className="bgImg">
          <form
            style={{
              marginRight: "600px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            onSubmit={search}
          >
            <input
              style={{ fontSize: "150%", width: "80%", marginBottom: "50px" }}
              autoFocus
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="Watch A Stream"
            />
            <button
              type="submit"
              style={{
                border: "2px solid blue",
                borderRadius: "2px",
                fontWeight: "bolder",
                fontSize: "150%",
                position: "absolute",
                left: "82%",
              }}
            >
              Join Stream
            </button>
          </form>
        </div>
      )}
      {flag && (
        <div>
          <iframe
            //We use the iframe to display the streaming.

            src={`https://player.twitch.tv/?channel=${username}&parent=localhost&muted=true`}
            // src={`https://player.twitch.tv/?channel=${username}&parent=shishu-teams.herokuapp.com&muted=true`}
            height="100%"
            width="100%"
            allowfullscreen={true} //Allows us to go fullScreen
          ></iframe>
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
        </div>
      )}
    </>
  );
};
export default WatchStream;
