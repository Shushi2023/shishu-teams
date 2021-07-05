import Iframe from "react-iframe";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useHistory } from "react-router";

const Website = () => {
  const [url, setUrl] = useState("");
  const [flag, setFlag] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    //This is called when we search for a website.
    e.preventDefault();
    setFlag(true);
  };
  return (
    <div className="bgImg">
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
      <form
        style={{ display: "flex", justifyContent: "center" }}
        onSubmit={handleSubmit}
      >
        <input
          style={{ width: "500px", fontSize: "150%" }}
          type="text"
          placeholder="Enter a valid Website"
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <button style={{ borderRadius: "2px" }} type="submit">
          Search
        </button>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {flag && (
          <Iframe //We are using Iframe to display websites, some of the advanced wesites might not work due to security issues.
            url={url} //This is the website we want to view
            width="50%"
            height="75%"
            display="initial"
            position="absolute"
            styles={{ left: "50%", right: "50%" }}
            sandbox="allow-same-origin"
            sandbox="allow-forms" //Allows us to open forms in our Iframe
          />
        )}
      </div>
    </div>
  );
};

export default Website;
