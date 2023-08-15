import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import ExitButton from "../components/ExitButton";
import Outline from "../components/Outline";
import { Form, Radio } from "semantic-ui-react";

const Exam = () => {
  const [index, setIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [question, setQuestion] = useState({});
  const location = useLocation();
  const { totalSeconds } = location.state;
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    () => localStorage.getItem("timer") || totalSeconds
  );
  const navigate = useNavigate();
  const test = JSON.parse(localStorage.getItem("test"));

  useEffect(() => {
    // console.log(test.allQuestions);
    if (isTimerDone) {
      localStorage.removeItem("timer");
      navigate("/results");
      setSelectedValue(question.selectedAnswer || null);
    }
  }, [index, question]);

  const pagination = [];
  for (let questionKey in test.allQuestions) {
    const questionObject = test.allQuestions[questionKey];
    pagination.push(questionObject);
  }

  const nextFunc = () => {
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setQuestion(pagination[nextIndex]);
    setSelectedValue(pagination[nextIndex].selectedAnswer || null);
  };

  const backFunc = () => {
    const prevIndex = index - 1;
    setIndex(prevIndex);
    setQuestion(pagination[prevIndex]);
    setSelectedValue(pagination[prevIndex].selectedAnswer || null);
  };

  const handleRadioChange = value => {
    setSelectedValue(value); // Update selected value in state
    pagination[index].selectedAnswer = value; // Update selectedAnswer in pagination
    console.log(pagination[index], pagination[index].selectedAnswer);
    // setSelectedValue(pagination[index].selectedAnswer);
    const updatedTest = { ...test };
    updatedTest.allQuestions[pagination[index].id].selectedAnswer = value;
    localStorage.setItem("test", JSON.stringify(updatedTest));
  };

  return (
    <>
      <h1>Exam</h1>
      <h2>Question: {index}</h2>
      <h3>{question.question}</h3>
      <Form>
        <Form.Field>
          <Radio
            label={question.a}
            name="radioGroup"
            value="a"
            checked={selectedValue === "a"}
            onChange={() => handleRadioChange("a")}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label={question.b}
            name="radioGroup"
            value="b"
            checked={selectedValue === "b"}
            onChange={() => handleRadioChange("b")}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label={question.c}
            name="radioGroup"
            value="c"
            checked={selectedValue === "c"}
            onChange={() => handleRadioChange("c")}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label={question.d}
            name="radioGroup"
            value="d"
            checked={selectedValue === "d"}
            onChange={() => handleRadioChange("d")}
          />
        </Form.Field>
      </Form>

      <Timer
        totalSeconds={totalSeconds}
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
        onTimerDone={() => setIsTimerDone(true)}
      />
      <button onClick={backFunc}>Back</button>
      <button onClick={nextFunc}>Next</button>
      <button>Flag</button>
      <Outline
        questionCategory={question.category}
        setIndex={setIndex}
        setQuestion={setQuestion}
        setSelectedValue={setSelectedValue}
        pagination={pagination}
        test={test}
      />
      <ExitButton totalSeconds={totalSeconds} remainingTime={remainingTime} />
    </>
  );
};

export default Exam;
