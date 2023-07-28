import React, { useEffect, useState } from "react";

const Timer = ({ totalSeconds, onTimerDone }) => {
  if (totalSeconds > 0) {
    const [remainingTime, setRemainingTime] = useState(totalSeconds); //the starting time state

    useEffect(() => {
      //monitors when the timer ends
      if (remainingTime > 0) {
        const timer = setInterval(() => {
          setRemainingTime(prev => prev - 1); // decriment the timer
        }, 1000);
        return () => clearInterval(timer); //getting rid of space
      } else {
        // the time ran out
        onTimerDone(); //function that changes the state, which will in turn dredirect
      }
    }, [remainingTime, onTimerDone]);

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

    return <div>{formatTime(remainingTime)}</div>;
  }
};

export default Timer;
