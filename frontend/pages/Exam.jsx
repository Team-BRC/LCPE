import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Timer from "../components/Timer";
import ExitButton from "../components/ExitButton";
import Outline from "../components/Outline";
import { Form, Radio, Progress, Container, Header } from "semantic-ui-react";
import PopUp from "../components/PopUp";

const Exam = () => {
  const { questionId } = useParams();
  const [progress, setProgess] = useState(0);
  const [flag, setFlag] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [question, setQuestion] = useState({});
  const location = useLocation();
  const { totalSeconds } = location.state;
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    () => localStorage.getItem("timer") || totalSeconds
  );
  const navigate = useNavigate();
  const test = JSON.parse(localStorage.getItem("test"));
  const pagination = Object.values(test.allQuestions);

  useEffect(() => {
    setQuestion(pagination[index]);
  }, []);

  useEffect(() => {
    // Fetch and set the question based on the questionId
    const currentQuestion = pagination.find(
      (q) => q.id === parseInt(questionId)
    );
    if (currentQuestion) {
      setIndex(pagination.indexOf(currentQuestion));
      setQuestion(currentQuestion);
      setSelectedValue(currentQuestion.selectedAnswer || null);
    }
  }, [questionId]);

  useEffect(() => {
    //listening for timer completion
    if (isTimerDone) {
      localStorage.removeItem("timer");
      navigate("/results");
      if (question.selectedAnswer) {
        setSelectedValue(question.selectedAnswer);
      }
    }
  }, [isTimerDone]);

  const nextFunc = () => {
    if (!pagination[index].selectedAnswer) {
      setShowModal(true); // Show the modal if no answer is selected
    } else {
      // Proceed to the next question
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setQuestion(pagination[nextIndex]);
      setSelectedValue(pagination[nextIndex].selectedAnswer || null);
    }
  };

  const backFunc = () => {
    const prevIndex = index - 1;
    setIndex(prevIndex);
    setQuestion(pagination[prevIndex]);
    setSelectedValue(pagination[prevIndex].selectedAnswer || null);
  };

  const handleRadioChange = (value) => {
    setSelectedValue(value);
    pagination[index].selectedAnswer = value;

    if (pagination[index].selectedAnswer === pagination[index].answer) {
      const correctAnswers = parseInt(test.correctAnswers || 0);
      test.correctAnswers = correctAnswers + 1;
    } else {
      test.incorrect.push(pagination[index]);
    }

    test.progress = progress + 1;
    setProgess(test.progress);

    const updatedTest = { ...test };
    updatedTest.allQuestions[pagination[index].id].selectedAnswer = value;

    localStorage.setItem("test", JSON.stringify(updatedTest));
  };

  const flagQuestion = () => {
    const updatedTest = { ...test };
    if (!flag) {
      // Flag the question
      updatedTest.flagged[index] = pagination[index];
      pagination[index].flag = true;
      setFlag(true);
    } else {
      // Unflag the question
      delete updatedTest.flagged[index];
      pagination[index].flag = false;
      setFlag(false);
    }
    localStorage.setItem("test", JSON.stringify(updatedTest));
  };

  const ExamProgress = () => (
    <Progress
      color="olive"
      className="progressBar"
      value={test.progress}
      total={test.totalQuestions}
      progress="ratio"
    />
  );

  return (
    <>
      <ExamProgress />
      <Timer
        totalSeconds={totalSeconds}
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
        onTimerDone={() => setIsTimerDone(true)}
      />
      <h2>Question: {index + 1}</h2>
      <h3>{question.question}</h3>
      <Form>
        <Form.Field>
          <Radio
            label={question.a}
            name="radioGroup"
            value="a"
            checked={selectedValue === "A"}
            onChange={() => handleRadioChange("A")}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label={question.b}
            name="radioGroup"
            value="b"
            checked={selectedValue === "B"}
            onChange={() => handleRadioChange("B")}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label={question.c}
            name="radioGroup"
            value="c"
            checked={selectedValue === "C"}
            onChange={() => handleRadioChange("C")}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label={question.d}
            name="radioGroup"
            value="d"
            checked={selectedValue === "D"}
            onChange={() => handleRadioChange("D")}
          />
        </Form.Field>
      </Form>

      <section className="questionButtons">
        {index + 1 === 1 ? "" : <button onClick={backFunc}>Back</button>}
        <button onClick={flagQuestion}>
          {!pagination[index].flag ? (
            <i className="flag outline icon"></i>
          ) : (
            <i className="flag icon"></i>
          )}
        </button>
        {index + 1 === Number(test.totalQuestions) ? (
          ""
        ) : (
          <button onClick={nextFunc}>Next</button>
        )}
      </section>
      <Outline
        questionCategory={question.category}
        setIndex={setIndex}
        setQuestion={setQuestion}
        setSelectedValue={setSelectedValue}
        pagination={pagination}
        test={test}
      />
      <ExitButton totalSeconds={totalSeconds} remainingTime={remainingTime} />

      {showModal && (
        <PopUp
          open={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false); // Close the modal
            // Proceed to the next question
            const nextIndex = index + 1;
            setIndex(nextIndex);
            setQuestion(pagination[nextIndex]);
            setSelectedValue(pagination[nextIndex].selectedAnswer || null);
          }}
        />
      )}
    </>
  );
};

export default Exam;
