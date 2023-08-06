// import QuestionProvider from "./context/QuestionProvider";
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HeadingNavigation from "./components/HeadingNavigation";
import Landing from "./pages/Landing";
import Exam from "./pages/Exam";
import Flags from "./pages/Flags";
import Exit from "./pages/Exit";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import "semantic-ui-css/semantic.min.css";
function App() {
  return (
    <>
      <HeadingNavigation />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/flags" element={<Flags />} />
            <Route path="/exit" element={<Exit />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>

    </>
  );
}

export default App;


