import { useEffect, useState } from 'react';
import { QuestionContext } from './QuestionContext';

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState({});

  useEffect(() => {
    // Define an async function to fetch questions
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:3000/api/questions", {
          method: "GET",
          mode: "cors",
          headers: {
              "Content-Type": "application/json",
          },
      });
        const questions = await response.json();
        setQuestions(questions.questions);
        // Initialize the test state
        setTest({
          progress: 0,
          correctAnswers: 0,
          totalQuestions: questions.length,
          incorrect: [],
          flagged: {},
          allQuestions: Array(questions.questions).reduce((acc, question, index) => {
            acc[question.id] = {
              selectedAnswer: null,
              increment: false,
              ...question,
            };
            return acc;
          }, {}),
        });
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    // Call the async function when the component mounts
    fetchQuestions();
  }, []); // The empty dependency array ensures that this effect runs only once

  const value = { questions, test, setTest };
  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;
