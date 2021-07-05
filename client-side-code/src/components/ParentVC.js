import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Close } from "@material-ui/icons";
const ParentVC = () => {
  const history = useHistory();

  return (
    <div>
      <div className="loginContainer">
        <Button
          style={{
            marginRight: "5px",
            position: "absolute",
            right: "0px",
            top: "0px",
          }}
          variant="contained"
          color="secondary"
          onClick={() => history.push("/")}
        >
          <Close />
        </Button>
        <Button
          style={{
            position: "absolute",
            right: "70%",
            top: "60%",
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
            top: "60%",
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
    </div>
  );
};

export default ParentVC;
