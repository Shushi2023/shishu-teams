import {Button} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const WatchStream = () => {
    const history = useHistory();
  return (
    <div>
      <iframe
        // src="https://player.twitch.tv/?channel=shushi3101&parent=localhost&muted=true"
        src="https://player.twitch.tv/?channel=shushi3101&parent=shishu-teams.herokuapp.com&muted=true"
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
