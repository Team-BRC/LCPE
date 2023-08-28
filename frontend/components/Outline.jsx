import { useEffect, useState, useRef } from "react";
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
      ><Icon name="sidebar" size="large" /></Button>
      
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="wide"
      >
        <Menu pointing secondary vertical className="menu">
          <h5>Categories</h5>
          {Object.keys(categoryList).map((category) => {
            return (
              <Menu.Item
                key={category}
                id="menuItems"
                as={Link}
                name={category}
                active={category === questionCategory}
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(false);
                }}
              ></Menu.Item>
            );
          })}
        </Menu>
        <div className="flaggedQuestionParent">
          <h5>Flagged Questions</h5>
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
      </Sidebar>
    </>
  );
};

export default Outline;
