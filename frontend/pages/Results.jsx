import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button, Card, Icon, Image } from "semantic-ui-react";
import Layout from "@/components/Layout";

export default function Results() {
  const router = useRouter(); // Use the useRouter hook for navigation

  useEffect(() => {
    const authorized = sessionStorage.getItem("userExists") !== null && sessionStorage.getItem("userExists") === "true" && sessionStorage.getItem("paymentExists") !== null && sessionStorage.getItem("paymentExists") === "true";
    if (!authorized) {
        router.push("/LoginPage")
    }
  }, []);
  const [test, setTest] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTest(JSON.parse(localStorage.getItem("test")));
      // console.log(test);
    }
  }, []);

  const resultInPercent = test
    ? Math.round((Number(test.correctAnswers) / Number(test.totalQuestions)) * 100)
    : 0;

  const goHome = () => {
    router.push("/Landing");
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
    /*
    else if (question.selectedAnswer === "D") {
      return question.d;
    } else {
      return question.e;
    }
    */
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
    /*
    else if (question.answer === "D") {
      return question.d;
    } else {
      return question.e;
    }
    */
  }

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center">
          <h1>Results</h1>
          <h2>{resultInPercent}%</h2>
          <h3>
            Final Result: {Number(test?.correctAnswers)} out of{" "}
            {Number(test?.totalQuestions)}{" "}
          </h3>
        </div>

        {test ? (
          <Card className="scroll-container" id="resultCard" centered={true}>
            <ul>
              {test?.incorrect.map((question) => (
                <Card
                  key={question.id}
                  className="answerCard"
                  fluid={true}
                  centered={true}
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
        ) : (
          <></>
        )}

        <div className="flex flex-col items-center justify-center">
          <Button onClick={goHome}>Return Home</Button>
        </div>
      </Layout>
    </>
  );
  
}
