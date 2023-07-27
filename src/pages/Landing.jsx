import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const navigate = useNavigate();

  const handleStartTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60; //convert hours + minutes to seconds
    navigate("/exam", { state: { totalSeconds } }); //redirect to the exam page, with the seconds as a state
  };

  return (
    <>
      <h1>Landing</h1>
      <div>
        <h1>Set the timer</h1>
        <div>
          <label>
            Hours:
            <input
              type="number"
              value={hours}
              onChange={e => setHours(e.target.value)}
            />
          </label>
          <label>
            Minutes:
            <input
              type="number"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleStartTimer}>Start Timer</button>
      </div>
    </>
  );
}
