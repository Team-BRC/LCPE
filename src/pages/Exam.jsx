import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import ExitButton from "../components/ExitButton";

const Exam = () => {
  const location = useLocation();
  const { totalSeconds } = location.state;
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    () => localStorage.getItem("timer") || totalSeconds
  );
  const navigate = useNavigate();

  useEffect(() => {
    //listening for timer completion
    if (isTimerDone) {
      //the timer ended
      localStorage.removeItem("timer");
      navigate("/results"); //redirect to results page
    }
  }, [isTimerDone, navigate]);

  return (
    <>
      <h1>Exam</h1>
      <Timer
        totalSeconds={totalSeconds}
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
        onTimerDone={() => setIsTimerDone(true)}
      />
      <ExitButton totalSeconds={totalSeconds} remainingTime={remainingTime} />
    </>
  );
};

export default Exam;
