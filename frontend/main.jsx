import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../index.css";
import QuestionProvider from "./context/QuestionProvider";
// import QuestionProvider from "./context/QuestionProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  // </React.StrictMode>
);
