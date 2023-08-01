import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import QuestionProvider from "./context/QuestionProvider.jsx";
// import QuestionProvider from "./context/QuestionProvider.jsx";

<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </React.StrictMode>
);
=======
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
>>>>>>> fc3f1298b1efa2d1ea49187a273eaf01c8a62b22
