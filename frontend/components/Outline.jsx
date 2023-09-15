import { useEffect, useState, useRef } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Sidebar, Icon } from "semantic-ui-react";

const changeQuestion = (
  questionId,
  setIndex,
  setQuestion,
  setSelectedValue,
  pagination
) => {
  const questionIndex = pagination.findIndex((q) => q.id === questionId);
  if (questionIndex !== -1) {
    setIndex(questionIndex);
    setQuestion(pagination[questionIndex]);
    setSelectedValue(pagination[questionIndex].selectedAnswer || null);
  }
};

const Outline = ({
  questionCategory,
  setIndex,
  setQuestion,
  setSelectedValue,
  pagination,
}) => {
  const [visible, setVisible] = useState(false);
  const flaggedQuestions = JSON.parse(localStorage.getItem("test")).flagged;
  const categoryList = JSON.parse(
    localStorage.getItem("test")
  ).listOfCategories;

  return (
    <>
      <Button
        color="grey"
        // content={questionCategory}
        onClick={() => setVisible(true)}
      >
        <Icon name="sidebar" size="large" />
      </Button>

      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        id="sidebar"
        width="wide"
      >
        <div className="exitButtonContainer">
          <Button
            onClick={() => setVisible(false)}
            className="exit"
            color="violet"
          >
            Close
          </Button>
        </div>
        <div className="flaggedQuestionParent">
          <h5>Flagged Questions</h5>
          <div className="flaggedQuestionList">
            {Object.keys(flaggedQuestions).map((questionId) => {
              const question = flaggedQuestions[questionId];
              return (
                <button
                  key={questionId}
                  className="flaggedQuestion"
                  onClick={() =>
                    changeQuestion(
                      question.id,
                      setIndex,
                      setQuestion,
                      setSelectedValue,
                      pagination
                    )
                  }
                >
                  {question.id} {question.question}
                </button>
              );
            })}
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Outline;
