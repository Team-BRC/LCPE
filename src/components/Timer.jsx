import React, { useEffect, useState } from "react";

const formatTime = timeInSeconds => {
  //time seconds -> string
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

const Timer = ({
  totalSeconds,
  remainingTime,
  setRemainingTime,
  onTimerDone,
}) => {
  // if (totalSeconds > 0) {
  //only do this if there is a set timer
  useEffect(() => {
    //monitors when the timer ends
    if (totalSeconds > 0 && remainingTime > 0) {
      //if there is a timer & there is time left
      const timer = setInterval(() => {
        setRemainingTime(prev => prev - 1); // decriment the timer
      }, 1000);
      return () => clearInterval(timer); //getting rid of space
    } else if (remainingTime <= 0) {
      //if the timer ran out
      // the time ran out
      onTimerDone(); //function that changes the state, which will in turn dredirect
    }
  }, [totalSeconds, remainingTime, setRemainingTime, onTimerDone]);

  if (totalSeconds > 0) {
    return <div>{formatTime(remainingTime)}</div>;
  }
  // }
};

export default Timer;
