import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Radio } from "semantic-ui-react";

export default function Landing() {
  const [minutes, setMinutes] = useState(0);
  const [timerType, setTimerType] = useState("noTimer"); // state to track the radio selection
  const navigate = useNavigate();

  const handleStartTimer = () => {
    const totalSeconds = minutes * 60; // convert minutes to seconds
    navigate("/exam", { state: { totalSeconds } }); // redirect to the exam page, with the seconds as a state
  };

  const formatTime = timeInMinutes => {
    const hours = Math.floor(timeInMinutes / 60);
    const remainingMinutes = timeInMinutes % 60;
    if (hours > 0) {
      return `${hours} hour${
        hours !== 1 ? "s" : ""
      } and ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
    } else {
      return `${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
    }
  };


  return (
    <div>
      <h3>Timer Options</h3>
      <Form>
        <Radio
          label="No Timer"
          value="noTimer"
          checked={timerType === "noTimer"}
          onChange={() => {
            setTimerType("noTimer");
            setMinutes(0);
          }}
        />
        <Radio
          label="Timer"
          value="timer"
          checked={timerType === "timer"}
          onChange={() => {
            setTimerType("timer");
            setMinutes(30);
          }}
        />
        <div>
          <label> 
            <h4 hidden={timerType === "noTimer"}>
              Time Set: {formatTime(minutes)} 
            </h4>
            <input
              type="range"
              min={30}
              step={15}
              max={240}
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              hidden={timerType === "noTimer"}
            />
          </label>
        </div>
      </Form>
      <button onClick={handleStartTimer}>Start</button>
    </div>
  );
}
