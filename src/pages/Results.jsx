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
  const goHome = () => {navigate("/")};

  return (
    <>
      <h1>Results</h1>
      <h2>{resultInPercent}%</h2>
      <h3>
        Final Result: {Number(test.correctAnswers)} out of{" "}
        {Number(test.totalQuestions)}{" "}
      </h3>
      <button onClick={goHome}>Return Home</button>
    </>
  );
}
