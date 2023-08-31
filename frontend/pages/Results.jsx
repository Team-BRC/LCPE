import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

export default function Results() {
  const navigate = useNavigate();

  const test = JSON.parse(localStorage.getItem("test"));
  useEffect(() => {}, []);
  console.log();
  const resultInPercent = Math.round(
    (Number(test.correctAnswers) / Number(test.totalQuestions)) * 100
  );
  const goHome = () => {
    navigate("/");
  };

  function wrongAnswer(question) {
    if (question.selectedAnswer === "A") {
      return question.a;
    } else if (question.selectedAnswer === "B") {
      return question.b;
    } else if (question.selectedAnswer === "C") {
      return question.c;
    } else {
      return question.d;
    }
  }

  function correctAnswer(question) {
    if (question.answer === "A") {
      return question.a;
    } else if (question.answer === "B") {
      return question.b;
    } else if (question.answer === "C") {
      return question.c;
    } else {
      return question.d;
    }
  }

  return (
    <>
      <h1>Results</h1>
      <h2>{resultInPercent}%</h2>
      <h3>
        Final Result: {Number(test.correctAnswers)} out of{" "}
        {Number(test.totalQuestions)}{" "}
      </h3>

      <Card
        className="scroll-container"
        id="resultCard"
        color="olive"
        centered="true"
      >
        <ul>
          {test.incorrect.map((question) => (
            <Card
              key={question.id}
              color="violet"
              className="answerCard"
              fluid="true"
              centered="true"
            >
              <Card.Header>
                <h3>
                  Question: {question.id} {question.question}
                </h3>
              </Card.Header>
              <br />
              <Card.Description>
                <h5 className="wrongAnswer">
                  Selected Answer: {wrongAnswer(question)}
                </h5>
                <h5 className="rightAnswer">
                  Correct Answer: {correctAnswer(question)}
                </h5>
                <h4>Explanation: {question.explained}</h4>
              </Card.Description>
            </Card>
          ))}
        </ul>
      </Card>
      <button onClick={goHome}>Return Home</button>
    </>
  );
}
