import React from "react";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars"; //We used this calander component to display.
import "./calendar.css";
import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const MyCalendar = () => {
  //This is the calander component.
  const history = useHistory(); //This is used for redirecting when we close the calander

  return (
    <>
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
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="bgImg"
      >
        <CalendarComponent></CalendarComponent>
      </div>
    </>
  );
};

export default MyCalendar;
