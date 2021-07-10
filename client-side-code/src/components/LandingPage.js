import { useState, useEffect } from "react";
import { Navigation } from "./navigation";
import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "./styles.css";
import Bot from "./chatbot/Bot";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const LandingPage = () => {
  //This is the main page.
  const [landingPageData, setLandingPageData] = useState({}); //Used to set the landingPageData from the data.json file.
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    //Called only once to set the landingPageData
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <div style={{ position: "sticky", bottom: "2%", left: "100%" }}>
        {" "}
        {/*This is the code for our Shishu Bot*/}
        {flag && <Bot onClick={() => setFlag(!flag)} flag={flag} />}
        <div className="chat-btn" onClick={() => setFlag(!flag)}></div>
      </div>
    </div>
  );
};

export default LandingPage;
