import {Button} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/Authcontex";

const WatchStream = () => {
    const history = useHistory();
    const {userName} = useAuth();
    console.log("name ", userName);
  return (
    <div>
      <iframe
        // src={`https://player.twitch.tv/?channel=${userName}&parent=localhost&muted=true`}
        src={`https://player.twitch.tv/?channel=${userName}&parent=shishu-teams.herokuapp.com&muted=true`}
        height="100%"
        width="100%"
        allowfullscreen={true}
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
          window.location.reload();
        }}
      >
        <Close />
      </Button>
    </div>
  );
};
export default WatchStream;
