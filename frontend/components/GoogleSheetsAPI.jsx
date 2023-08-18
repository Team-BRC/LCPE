// import fetchData from "/index.js";
// import React, { useEffect, useState } from "react";
// // import QuestionContext from "./QuestionContext";
// const bestSheetsDupe = [];

// const MyContext = () => {
//   const [questions, setQuestions] = useState([]);
//   const [test, setTest] = useState(null);
//   useEffect(() => {
//     try {
//       async function getSheets() {
//         const response = await fetchData();
//         const sheet = await response;
//         console.log(sheet.values);
//         for (let i = 1; i < sheet.values.length; i++) {
//           let questionObj = {};
//           let question = sheet.values[i];
//           questionObj = {
//             SubCatNum: question[0],
//             Category: question[1],
//             Subcategory: question[2],
//             Question: question[3],
//             A: question[4],
//             B: question[5],
//             C: question[6],
//             D: question[7],
//             Answer: question[8],
//             Explanation: question[9],
//             Picture: question[10],
//           };
//           bestSheetsDupe.push(questionObj);
//         }
//         setQuestions(bestSheetsDupe);
//         return bestSheetsDupe
//       }
//       getSheets();
//     } catch (error) {
//       console.log(error);
//     }
//     getSheets(bestSheetsDupe);
//   }, []);

//   return <>{bestSheetsDupe}</>;
// };

// export default MyContext;
/**----------------------------------------- */
// best Sheets function if needed 
// const API =
//   "https://sheet.best/api/sheets/479ee362-5a23-4222-9559-2429138784fd";

    // try {
    //   async function getQuestions() {
    //     const response = await fetch(API);
    //     const data = await response.json();
    //     console.log(data)
    //     setQuestions(data);
    //     return data;
    //   }
    //   getQuestions();
