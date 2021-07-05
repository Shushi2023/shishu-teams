import React, { useState } from "react";
import "./youtube.css";
import ReactPlayer from "react-player/youtube"; //This is used to display the youtube videos using the URL
import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const searchYouTube = async (q) => {
  //Called when we click on search
  //API for getting the youtube data
  q = encodeURIComponent(q);
  const response = await fetch(
    "https://youtube-search-results.p.rapidapi.com/youtube-search/?q=" + q,
    {
      method: "GET",
      headers: {
        //Headers required by the api
        "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
        "x-rapidapi-key": "29e5adb8bamsh455113d4b3ece88p163a33jsn864e6b08f6f5",
      },
    }
  );
  const body = await response.json();
  console.log(body);
  return body.items.filter((item) => item.type === "video");
};

const Youtube = () => {
  const [query, setQuery] = useState(""); //This is what we want to search for
  const [list, setList] = useState(null); //This is the result we get after searching
  const history = useHistory(); //Used to redirect when we close

  const search = (e) => {
    //Calling the search function
    e.preventDefault();
    searchYouTube(query).then(setList);
  };

  return (
    <>
      <div className="background">
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
        <div className="app">
          <div style={{ width: "100%" }}>
            <form
              style={{
                marginRight: "600px",
                marginLeft: "200px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              onSubmit={search}
            >
              <input
                style={{ fontSize: "150%", width: "80%", marginBottom: "50px" }}
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search On Youtube"
              />
              <button
                style={{
                  border: "2px solid blue",
                  borderRadius: "2px",
                  fontWeight: "bolder",
                  fontSize: "150%",
                  position: "absolute",
                  left: "97%",
                }}
              >
                Search YouTube
              </button>
            </form>

            {list &&
              (list.length === 0 ? (
                <p>No results</p>
              ) : (
                <ul>
                  {list.map((item) => (
                    <li className="item" key={item.id}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          fontSize: "40px",
                        }}
                      >
                        <b>
                          <a href={item.link}>{item.title}</a>
                        </b>
                        <p>{item.description}</p>
                      </div>
                      <ReactPlayer //We use the react player for viewing the youtube video within our app.
                        url={item.url}
                        controls={true}
                      />
                      <ul className="meta">
                        <li>
                          By: <a href={item.author.ref}>{item.author.name}</a>
                        </li>
                        <li>Views: {item.views}</li>
                        <li>Duration: {item.duration}</li>
                        <li>Uploaded: {item.uploadedAt}</li>
                      </ul>
                    </li>
                  ))}
                </ul>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Youtube;
