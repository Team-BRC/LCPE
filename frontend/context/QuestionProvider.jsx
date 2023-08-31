import React, { useEffect, useState } from "react";
import QuestionContext from "./QuestionContext";
import fetchData from "../index.js";

export default function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState(null);
  const bestSheetsDupe = [];
  const spreadsheetId = "1W2zM3dAoI4NV4OP03AoPlF1xx6seHYREuljTVfNv3NY";
  const sheetId = "Sheet1!A:K";
  const key = "AIzaSyAnlgDEjvDngsnvlvbhC9MQLfrA3CPtGAM";
  var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetId}?key=${key}`;

  useEffect(() => {
    try {
      async function googleSheets() {
        var response = await fetch(url, {
          method: "GET",
          mode: "cors",
          headers: {
            Host: "sheets.googleapis.com",
            'Content-Type': "application/json",
          },
        });
        const sheet = await response.json();
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
            Flag: false,
          };
          bestSheetsDupe.push(questionObj);
        }
        setQuestions(bestSheetsDupe);
        return bestSheetsDupe;
      }
      // getSheets();
      googleSheets();
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
