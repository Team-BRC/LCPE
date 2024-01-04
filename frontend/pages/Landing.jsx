import React, { useState, useContext, useEffect } from "react";
import { useRouter } from 'next/router';
import { Form, Radio, Button } from "semantic-ui-react";
import {useQuestionContext} from '../context/QuestionContext';
import Test from "../Test";
import Layout from "@/components/Layout";
import styles from '../app/Landing.module.css';
import Image from "next/image";
import logo from "../assets/logo.png"

export default function Landing() {
  const router = useRouter(); // Use the useRouter hook for navigation

  useEffect(() => {
    const authorized = sessionStorage.getItem("userExists") !== null && sessionStorage.getItem("userExists") === "true" && sessionStorage.getItem("paymentExists") !== null && sessionStorage.getItem("paymentExists") === "true";
    if (!authorized) {
        router.push("/LoginPage")
    }
  }, []);

  const [minutes, setMinutes] = useState(0);
  const [timerType, setTimerType] = useState("noTimer"); // state to track the radio selection
  const [selectedExamSize, setSelectedExamSize] = useState(175);
  const {questions, test, setTest} = useQuestionContext();


  function handleExamGeneration(questions, selectedExamSize) {
    const examInstance = new Test(selectedExamSize);
    if (examInstance.generateExam(questions, examInstance.totalQuestions) === null) {
      return null;
    }
    console.log(examInstance);
    const examInstanceJSON = JSON.stringify(examInstance);
    localStorage.setItem("test", examInstanceJSON);
    return examInstance;
  }

  const handleStart = () => {
    const totalSeconds = minutes * 60; // convert minutes to seconds
    localStorage.removeItem("timer");
    // console.log(questions);
    const test = handleExamGeneration(questions, selectedExamSize);
    if (test !== null) {
      localStorage.setItem("totalSeconds", totalSeconds)
      // localStorage.setItem("test", test)
      router.push("/Exam"); // redirect to the exam page, with the seconds as a state
    }
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
    <Layout>
      <div id="landing">
        <h1 className={styles.brandTitle} >Lactation Consultant Practice Test</h1>
        <Image src={logo} height={300} width={300}></Image>
        <div>
          <ul>
            <li> - You will have the option complete 175 questions or choose the quantity</li>
            <li> - You can go back to questions</li>
            <li> - You can flag questions</li>
          </ul>
        </div>
        <h2 className={styles.sectionTitle}>Practice Exam ( No timer, 175 questions)</h2>
        <h2 className={styles.sectionTitle}>Mock Exam (~3 hours, 175 questions)</h2>
        <h3 className={styles.sectionTitle}>Timer Options</h3>
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
          &nbsp;&nbsp;&nbsp;
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
              <br/>
            </label>
          </div>
          <h3 className={styles.sectionTitle}># of Questions</h3>
          <input
            type="number"
            value={selectedExamSize}
            max={175}
            min={0}
            onChange={(e) => setSelectedExamSize(e.target.value)}
        />
        </Form>
        <br />
        <Button className={styles.startButton} onClick={handleStart}>Start</Button>
      </div>
    </Layout>
  );
}
