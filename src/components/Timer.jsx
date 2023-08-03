import React, { useEffect } from "react";

const formatTime = timeInSeconds => {
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
  useEffect(() => {
    //monitors when the timer ends
    if (totalSeconds > 0 && remainingTime > 0) {
      //if there is a timer & there is time left
      const timer = setInterval(() => {
        setRemainingTime(prev => prev - 1); // decriment the timer
      }, 1000);
      localStorage.setItem("timer", remainingTime);
      return () => clearInterval(timer); //getting rid of space
    } else if (totalSeconds > 0 && remainingTime <= 0) {
      onTimerDone(); //the timer ran out, function that changes the state, which will in turn redirect
    }
  }, [totalSeconds, remainingTime, setRemainingTime, onTimerDone]);

  if (totalSeconds > 0) {
    return <div>{formatTime(remainingTime)}</div>;
  }
};

export default Timer;
