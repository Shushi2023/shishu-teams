import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const searchNews = async (q) => {
  q = encodeURIComponent(q);
  const response = await fetch(
    `https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`,
    {
      method: "GET",
      headers: {
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
  const [query, setQuery] = useState("");
  const [list, setList] = useState(null);
  const history = useHistory();
  const search = (e) => {
    e.preventDefault();
    searchNews(query).then(setList);
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
