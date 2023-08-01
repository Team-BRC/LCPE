import React, { useEffect, useState } from "react";
import QuestionContext from "./QuestionContext";
// // import SERVICE_ACCOUNT_KEY from "./path/to/your/serviceAccountKey.json"; // Replace with the path to your service account key JSON file

// const QuestionProvider = ({ children }) => {
//   const SPREADSHEET_ID = "1W2zM3dAoI4NV4OP03AoPlF1xx6seHYREuljTVfNv3NY"; // Replace with your actual Google Sheets document ID

//   const [content, setContent] = useState([]);

//   useEffect(() => {
//     const fetchDataFromGoogleSheets = async () => {
//       try {
//         const client_id =
//           "656228818762-9p2q99muctd6grllbd2l9fdt6t38medl.apps.googleusercontent.com";
//         const client_secret = "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";
//         const body = new URLSearchParams({
//           grant_type: "client_credentials",
//           client_id: client_id,
//           client_secret: client_secret,
//         });
//         const access_token_url = "https://accounts.google.com/o/oauth2/token";
//         const access_token_response = await fetch(access_token_url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: body.toString(),
//         });
//         const access_token_data = await access_token_response.json();
//         const access_token = access_token_data.access_token;
//         console.log(access_token);
//         // Set up the URL to fetch data from Google Sheets API
//         const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A1:K`;

//         // Make the API call using fetch and pass the access token in the Authorization header
//         const response = await fetch(url, {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//         });
//         const range = await response.json();
//         if (!range || !range.values || range.values.length === 0) {
//           setContent("No values found.");
//         } else {
//           const output = range.values.map((row) => row.join(" "));
//           setContent(output);
//         }
//       } catch (err) {
//         setContent(err.message);
//       }
//     };

//     fetchDataFromGoogleSheets();
//   }, []);

//   const values = { response: content };

//   return (
//     <QuestionContext.Provider value={values}>
//       {children}
//     </QuestionContext.Provider>
//   );
// };

// export default QuestionProvider;

const API =
  "https://sheet.best/api/sheets/479ee362-5a23-4222-9559-2429138784fd";

export default function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    try {
      async function getQuestions() {
        const response = await fetch(API);
        const data = await response.json();
        console.log(data);
        setQuestions(data);
        return data;
      }
      getQuestions();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const value = { questions };
  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}
