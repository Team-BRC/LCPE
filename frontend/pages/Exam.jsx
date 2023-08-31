import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Timer from "../components/Timer";
import ExitButton from "../components/ExitButton";
import Outline from "../components/Outline";
import {
  Icon,
  Form,
  Radio,
  Progress,
  Container,
  Header,
  Button,
} from "semantic-ui-react";
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
      <section className="outlineAndExit">
        <Outline
          questionCategory={question.category}
          setIndex={setIndex}
          setQuestion={setQuestion}
          setSelectedValue={setSelectedValue}
          pagination={pagination}
          test={test}
        />
        <Timer
          totalSeconds={totalSeconds}
          remainingTime={remainingTime}
          setRemainingTime={setRemainingTime}
          onTimerDone={() => setIsTimerDone(true)}
        />
        <ExitButton totalSeconds={totalSeconds} remainingTime={remainingTime} />
      </section>

      <ExamProgress />
      <section className="flagAndQuestionNumber">
        <h2>Question: {index + 1}</h2>
        <div className="flagButtonContainer">
          <Button size="tiny" color="orange" onClick={flagQuestion}>
            {!pagination[index].flag ? (
              <i className="flag outline icon" id="flag"></i>
            ) : (
              <i className="flag icon" id="flag"></i>
            )}
          </Button>
        </div>
      </section>

      <h3>{question.question}</h3>

      <Form className="examQuestions">
        <Form.Field>
          <Button
            color={selectedValue === "A" ? "black" : "gray"}
            className="questionButton"
            name="radioGroup"
            value="a"
            checked={selectedValue === "A"}
            onClick={() => handleRadioChange("A")}
          >
            {question.a}
          </Button>
        </Form.Field>
        <Form.Field>
          <Button
            color={selectedValue === "B" ? "black" : "gray"}
            className="questionButton"
            name="radioGroup"
            value="b"
            checked={selectedValue === "B"}
            onClick={() => handleRadioChange("B")}
          >
            {question.b}
          </Button>
        </Form.Field>
        <Form.Field>
          <Button
            color={selectedValue === "C" ? "black" : "gray"}
            className="questionButton"
            name="radioGroup"
            value="c"
            checked={selectedValue === "C"}
            onClick={() => handleRadioChange("C")}
          >
            {question.c}
          </Button>
        </Form.Field>
        <Form.Field>
          <Button
            color={selectedValue === "D" ? "black" : "gray"}
            className="questionButton"
            name="radioGroup"
            value="d"
            checked={selectedValue === "D"}
            onClick={() => handleRadioChange("D")}
          >
            {question.d}
          </Button>
        </Form.Field>
      </Form>
      <br />

      <section className="questionButtons">
        {index + 1 === 1 ? "" : <button onClick={backFunc}>Back</button>}
        {test.progress >= Number(test.totalQuestions) && (
          <section className="submitSection">
            <Button
              color="green"
              size="large"
              onClick={() => navigate("/results")}
              className="submitExamButton"
            >
              Submit Exam
            </Button>
          </section>
        )}

        {index + 1 === Number(test.totalQuestions) ? (
          ""
        ) : (
          <button onClick={nextFunc}>Next</button>
        )}
      </section>

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

