import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Navigation } from "./navigation";
const ParentVC = () => {
  const history = useHistory();

  return (
    <div>
      <Navigation />
      <Button
        style={{
          position: "absolute",
          right: "70%",
          top: "50%",
        }}
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push("/videoCall");
        }}
      >
        One to One Video Call
      </Button>
      <Button
        style={{
          position: "absolute",
          right: "20%",
          top: "50%",
        }}
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push("/groupVC");
        }}
      >
        Group Video Call
      </Button>
    </div>
  );
};

export default ParentVC;
