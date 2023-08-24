import React, { useEffect, useState } from "react";
import QuestionContext from "./QuestionContext";
import fetchData from "../index.js";

export default function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState(null);
  const bestSheetsDupe = [];

  useEffect(() => {
    try {
      async function getSheets() {
        const response = await fetchData();
        const sheet = await response;
        for (let i = 1; i < sheet.values.length; i++) {
          let questionObj = {};
          let question = sheet.values[i];
          questionObj = {
            SubCatNum: question[0],
            Category: question[1],
            Subcategory: question[2],
            Question: question[3],
            A: question[4],
            B: question[5],
            C: question[6],
            D: question[7],
            Answer: question[8],
            Explained: question[9],
            Picture: question[10],
            Flag: false
          };
          bestSheetsDupe.push(questionObj);
        }
        setQuestions(bestSheetsDupe);
        return bestSheetsDupe;
      }
      getSheets();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const value = { questions, test, setTest };
  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}
