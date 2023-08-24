import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Radio } from "semantic-ui-react";
import QuestionContext from "../context/QuestionContext";
import Test from "../Test";

export default function Landing() {
  const [minutes, setMinutes] = useState(0);
  const [timerType, setTimerType] = useState("noTimer"); // state to track the radio selection
  const [selectedExamSize, setSelectedExamSize] = useState(175);
  const navigate = useNavigate();
  const { questions } = useContext(QuestionContext);

  function handleExamGeneration(questions, selectedExamSize) {
    const examInstance = new Test(selectedExamSize);
    console.log(examInstance);
    examInstance.generateExam(questions, examInstance.totalQuestions);
    const examInstanceJSON = JSON.stringify(examInstance);
    localStorage.setItem("test", examInstanceJSON);
  }

  const handleStart = () => {
    const totalSeconds = minutes * 60; // convert minutes to seconds
    localStorage.removeItem("timer");
    handleExamGeneration(questions, selectedExamSize);
    navigate("/exam", { state: { totalSeconds } }); // redirect to the exam page, with the seconds as a state
  };

  const formatTime = (timeInMinutes) => {
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
    <div id="landing">
      <h1>Lactation Consultant Practice Test</h1>
      <br />
      <ul>
        <li>you will have the option complete 175 questions or choose the quantity</li>
        <li>you can go back to questions</li>
        <li>you can flag questions</li>
      </ul>
      <h2>Practice Exam ( No timer, 175 questions)</h2>
      <h2>Mock Exam (~3 hours, 175 questions)</h2>
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
              onChange={(e) => setMinutes(e.target.value)}
              hidden={timerType === "noTimer"}
            />
          </label>
        </div>
        <input
          type="number"
          value={selectedExamSize}
          max={175}
          min={0}
          onChange={(e) => setSelectedExamSize(e.target.value)}
        />
      </Form>
      <br />
      <button onClick={handleStart}>Start</button>
    </div>
  );
}
