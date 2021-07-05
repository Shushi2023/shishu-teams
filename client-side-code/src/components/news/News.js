import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const searchNews = async (q) => {
  //This is where we make the api call
  q = encodeURIComponent(q);
  const response = await fetch(
    `https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`,
    {
      method: "GET",
      headers: {
        //Setting the required headers required for the API here.
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": "ae5d4b1fe2msh0db59c7dbd03ff4p15ee88jsn9e54b6a6f3ea",
        "x-bingapis-sdk": "true",
      },
    }
  );
  const body = await response.json();
  return body.value;
};

const Item = ({ item }) => {
  //This is for styling a single item of our search result
  const formatDate = (s) =>
    new Date(s).toLocaleDateString(undefined, { dateStyle: "long" });
  return (
    <li className="item">
      <h2 className="title">
        <a href={item.url} target="_blank">
          {item.name}
        </a>
      </h2>
      <p className="description">{item.description}</p>
      <div className="meta">
        <span>{formatDate(item.datePublished)}</span>
        <span className="provider">
          {item.provider[0].image?.thumbnail && (
            <img
              className="provider-thumbnail"
              alt=""
              src={item.provider[0].image.thumbnail.contentUrl + "&w=16&h=16"}
            />
          )}
          {item.provider[0].name}
        </span>
      </div>
    </li>
  );
};

const News = () => {
  //This is our news component for getting the news
  const [query, setQuery] = useState(""); //This is the news we want to search for
  const [list, setList] = useState(null); //This is the list of results
  const history = useHistory(); //This is for redirecting when we close the component

  const search = (e) => {
    //Called when we click on search
    e.preventDefault(); //Prevents the default behaviour
    searchNews(query).then(setList); //The main function that's called
  };
  return (
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
              style={{ fontSize: "150%", width: "60%", marginBottom: "50px" }}
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Latest News"
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
              Search
            </button>
          </form>
          {!list ? null : list.length === 0 ? (
            <p>
              <i>No results</i>
            </p>
          ) : (
            <ul>
              {list.map((item, i) => (
                <Item key={i} item={item} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
