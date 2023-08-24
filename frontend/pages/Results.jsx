import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Results() {
  const navigate = useNavigate();

  const test = JSON.parse(localStorage.getItem("test"));
  useEffect(() => {
    console.log(test);
  }, []);
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
      <div className="scroll-container">
        <ul>
          {test.incorrect.map((question) => (
            <li key={question.id}>
              <br />
              <h4>
                Question: {question.id} {question.question}
              </h4>

              <p>Selected Answer: {wrongAnswer(question)}</p>

              <p>Correct Answer: {correctAnswer(question)}</p>
              <h4>Explanation: {question.explained}</h4>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={goHome}>Return Home</button>
    </>
  );
}
