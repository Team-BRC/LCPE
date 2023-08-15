import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Sidebar } from "semantic-ui-react";

const Outline = ({ questionCategory }) => {
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
                  /*ok bro here is where we gotta set the next questions,
                  i made it so that categoryList[category] is the index of the first question in that category,
                  so clicking on a category for now should redirect to the "start" of the category.
                    ideally, the steps should be 
                      1. prevent refresh [ check ]
                      2. change the question
                      3. close the menu [ check ]
                    changing the questions should automatically change the active status and all that, but we'll see
                  */
                  e.preventDefault();
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
