import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Sidebar } from "semantic-ui-react";

const changeQuestion = (
  categoryList,
  newCategory,
  setIndex,
  setQuestion,
  setSelectedValue,
  pagination
) => {
  const newIndex = categoryList[newCategory];
  setIndex(newIndex);
  setQuestion(pagination[newIndex]);
  setSelectedValue(pagination[newIndex].selectedAnswer || null);
};

const Outline = ({
  questionCategory,
  setIndex,
  setQuestion,
  setSelectedValue,
  pagination,
}) => {
  const [visible, setVisible] = useState(false);
  const categoryList = JSON.parse(
    localStorage.getItem("test")
  ).listOfCategories;
  return (
    <>
      <Button content={questionCategory} onClick={() => setVisible(true)} />
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="thin"
      >
        <Menu pointing secondary vertical>
          {Object.keys(categoryList).map(category => {
            return (
              <Menu.Item
                as={Link}
                name={category}
                active={category === questionCategory}
                onClick={e => {
                  e.preventDefault();
                  changeQuestion(
                    categoryList,
                    category,
                    setIndex,
                    setQuestion,
                    setSelectedValue,
                    pagination
                  );
                  setVisible(false);
                }}
              ></Menu.Item>
            );
          })}
        </Menu>
      </Sidebar>
    </>
  );
};

export default Outline;
