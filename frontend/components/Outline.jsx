import { useEffect, useState, useRef } from "react";
import React from "react";
import { Button, Menu, Sidebar, Icon } from "semantic-ui-react";
import "../app/index.css";

const changeQuestion = (
  questionId,
  setIndex,
  setQuestion,
  setSelectedValue,
  pagination
) => {
  const questionIndex = Object.values(pagination).findIndex((q) => q.id === questionId);
  console.log(pagination)
  if (questionIndex !== -1) {
    setIndex(questionIndex+1);
    setQuestion(pagination[questionIndex+1]);
    setSelectedValue(pagination[questionIndex+1].selectedAnswer || null);
  }
};

const Outline = ({
  questionCategory,
  setIndex,
  setQuestion,
  setSelectedValue,
  pagination,
  test
}) => {

  const [visible, setVisible] = useState(false);
  // const [test, setTest] = useState([])
  const [flaggedQuestions, setFlaggedQuestions] = useState(test.flagged)
  const [categoryList, setCategoryList] = useState([])

  // useEffect(() => {
  //   // Check if running on the client side before accessing localStorage
  //   if (typeof window !== 'undefined') {
  //     // setTest(JSON.parse(localStorage.getItem('test')));
  //     // Ensure 'test' is not null before accessing 'allQuestions'
  //     console.log(test.flagged)
  //     setFlaggedQuestions(test.flagged)
  //     setCategoryList(test.listOfCategories)
  //   }
  // }, []);

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
            {test.flagged ? (Object.keys(test.flagged).map((questionId) => {
              const question = test.flagged[questionId];
              return (
                <button
                  key={questionId}
                  className="flaggedQuestion text-white bg-gray-500"
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
                  {question.id}
                </button>
              );
            })) : <></>}
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Outline;
