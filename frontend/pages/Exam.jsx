import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
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
import "semantic-ui-css/semantic.min.css";
import PopUp from "../components/PopUp";
import "../app/index.css";
import styles from "../app/Exam.modules.css";
import Layout from "../components/Layout";

export default function Exam() {

  const router = useRouter(); // Use the useRouter hook for navigation

  useEffect(() => {
    const authorized = sessionStorage.getItem("userExists") !== null && sessionStorage.getItem("userExists") === "true" && sessionStorage.getItem("paymentExists") !== null && sessionStorage.getItem("paymentExists") === "true";
    if (!authorized) {
        router.push("/LoginPage")
    }
  }, []);

  const [progress, setProgess] = useState(0);
  const [flag, setFlag] = useState(false);
  const [index, setIndex] = useState(1);
  const [selectedValue, setSelectedValue] = useState(null);
  const [question, setQuestion] = useState({});
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [test, setTest] = useState({})
  const [pagination, setPagination] = useState([])
  const [totalSeconds, setTotalSeconds] = useState(0)

  // Set initial state based on localStorage or totalSeconds from the URL query
  const initialRemainingTime = () => {
    if (typeof window !== 'undefined') {
      const storedTime = localStorage.getItem('totalSeconds');
      return storedTime !== null ? storedTime : totalSeconds;
    }
    return totalSeconds;
  };
  const [remainingTime, setRemainingTime] = useState(initialRemainingTime);
  // Update localStorage whenever remainingTime changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('timer', remainingTime);
    }
  }, [remainingTime]);

  useEffect(() => {
    // Check if running on the client side before accessing localStorage
    if (typeof window !== 'undefined') {
      const storedTest = JSON.parse(localStorage.getItem('test'));
      setTotalSeconds(localStorage.getItem('totalSeconds'))
      if (storedTest && storedTest.allQuestions) {
        const paginationValues = storedTest.allQuestions;
        setPagination(paginationValues);
        setQuestion(paginationValues[index]);
      }
      setTest(storedTest);
    }
  }, []);

  // useEffect(() => {
  //   setQuestion(pagination[index]);
  // }, []);

  // useEffect(() => {
  //   // Fetch and set the question based on the questionId
  //   const currentQuestion = pagination.find(
  //     (q) => q.id === parseInt(questionId)
  //   );
  //   if (currentQuestion) {
  //     setIndex(pagination.indexOf(currentQuestion));
  //     setQuestion(currentQuestion);
  //     setSelectedValue(currentQuestion.selectedAnswer || null);
  //   }
  // }, [questionId]);

  useEffect(() => {
    //listening for timer completion
    if (isTimerDone) {
      localStorage.removeItem("timer");
      localStorage.setItem("test", JSON.stringify(test));
      router.push("/Results");
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
    if (index >= 2){
      const prevIndex = index - 1;
      setIndex(prevIndex);
      setQuestion(pagination[prevIndex]);
      setSelectedValue(pagination[prevIndex].selectedAnswer || null);
    }
  };

  const submitExam = () => {
    localStorage.setItem("test", JSON.stringify(test));
    router.push("/Results")
  }

  const handleRadioChange = (value) => {
    setSelectedValue(value);
    if (
      (pagination[index].selectedAnswer = value) &&
      pagination[index].increment === false
    ) {
      test.progress = progress + 1;
      setProgess(test.progress);
      pagination[index].increment = true;
    }

    if (pagination[index].selectedAnswer === pagination[index].answer) {
      const correctAnswers = parseInt(test.correctAnswers || 0);
      test.correctAnswers = correctAnswers + 1;
    } else {
      test.incorrect.push(pagination[index]);
    }

    const updatedTest = { ...test };
    updatedTest.allQuestions[pagination[index].id].selectedAnswer = value;
    setTest(updatedTest)
    // localStorage.setItem("test", JSON.stringify(updatedTest));
  };

  const flagQuestion = () => {
    const updatedTest = { ...test };
    if (!pagination[index].flag) {
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
    setTest(updatedTest)
    // localStorage.setItem("test", JSON.stringify(updatedTest));
  };

  const ExamProgress = () => (
    <div className="flex items-center justify-center mt-10">
      <Progress
        color="olive"
        className="progressBar"
        value={test.progress}
        total={test.totalQuestions}
        progress="ratio"
      />
    </div>
  );

  return (
    <div className={styles.container}>
      <Layout>
        <div style={{ overflowY: 'auto', maxHeight: '80vh' }}>
          {test ? (
            <section className="flex flex-row	space-x-64 items-center justify-center margin-bottom: 20px">
              <Outline
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
              <ExitButton totalSeconds={totalSeconds} remainingTime={remainingTime} test={test} />
            </section>
          ) : null}

          {test? <ExamProgress/> : null}

          {test ? (
            <section className="flex flex-row	space-x-4 items-center justify-center">
              <div>
                <Button color="orange" onClick={flagQuestion} >
                  {pagination.length !== 0 ? (
                    !pagination[index].flag ? (
                      <i class="flag outline icon" id="flag"></i>
                    ) : (
                      <i className="flag icon" id="flag"></i>
                    )
                  ) : (
                    <i className="flag icon" id="flag"></i>
                  )}
                </Button>
              </div>
              <h2>Question: {index}</h2>
            </section>
          ) : null}

          {test ? <h3>{question.question}</h3> : null}

          {test ? <br /> : null}

          {test ? (
            <div className="flex items-center justify-center">
              {question.picture &&
                <Image
                  src={question.picture}
                  alt="Your Image Alt Text"
                  width={300} // Set to the desired width
                  height={200} // Set to the desired height
                />
              }
            </div>
          ) : null}

          {test ? <br /> : null}

          {test ? (
            <Form className={styles.examQuestions}>
              <Form.Field>
                <Button
                  color={selectedValue === "A" ? "black" : "grey"}
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
                  color={selectedValue === "B" ? "black" : "grey"}
                  className="questionButton"
                  name="radioGroup"
                  value="b"
                  checked={selectedValue === "B"}
                  onClick={() => handleRadioChange("B")}
                >
                  {question.b}
                </Button>
              </Form.Field>
              {question.c && ( // Check if question.c has a value
                <Form.Field>
                  <Button
                    color={selectedValue === "C" ? "black" : "grey"}
                    className="questionButton"
                    name="radioGroup"
                    value="c"
                    checked={selectedValue === "C"}
                    onClick={() => handleRadioChange("C")}
                  >
                    {question.c}
                  </Button>
                </Form.Field>
              )}
              {question.d && ( // Check if question.d has a value
                <Form.Field>
                  <Button
                    color={selectedValue === "D" ? "black" : "grey"}
                    className="questionButton"
                    name="radioGroup"
                    value="d"
                    checked={selectedValue === "D"}
                    onClick={() => handleRadioChange("D")}
                  >
                    {question.d}
                  </Button>
                </Form.Field>
              )}
              {question.e && ( // Check if question.e has a value
                <Form.Field>
                  <Button
                    color={selectedValue === "E" ? "black" : "grey"}
                    className="questionButton"
                    name="radioGroup"
                    value="e"
                    checked={selectedValue === "E"}
                    onClick={() => handleRadioChange("E")}
                  >
                    {question.e}
                  </Button>
                </Form.Field>
              )}
            </Form>
          ) : null}

          {test ? <br /> : null}

          {test ? (
            <section className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              {index === 1 ? "" : <Button onClick={backFunc}>Back</Button>}
              
              {test.progress >= Number(test.totalQuestions) && (
                <section className="submitSection">
                  <Button
                    color="green"
                    size="large"
                    onClick={submitExam}
                    className="submitExamButton"
                  >
                    Submit Exam
                  </Button>
                </section>
              )}

              {index === Number(test.totalQuestions) ? ("") : 
              (
                <Button onClick={nextFunc}>Next</Button>
              )}
            </section>
          ) : null}


          {test && showModal && (
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
        </div>
      </Layout>
    </div>
  );
};
