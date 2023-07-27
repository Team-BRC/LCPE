import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Timer from "../components/Timer";

const Exam = () => {
  const location = useLocation();
  const { totalSeconds } = location.state;
  const [isTimerDone, setIsTimerDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { //listening for timer completion
    if (isTimerDone) { //the timer ended
      navigate("/results"); //redirect to results page
    }
  }, [isTimerDone, navigate]);

  return (
    <>
      <h1>Exam</h1>
      <Timer
        totalSeconds={totalSeconds}
        onTimerDone={() => setIsTimerDone(true)}
      />
    </>
  );
};

export default Exam;
