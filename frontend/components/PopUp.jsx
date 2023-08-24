import React from "react";
import { Button, Modal } from "semantic-ui-react";

const PopUp = ({ open, onClose, onConfirm }) => {
  return (
    <Modal size="tiny" open={open} onClose={onClose}>
      <Modal.Header>Confirm Action</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to proceed without selecting an answer?</p>
        <p>You can always flag the question you would like to revisit</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={onClose}>
          No
        </Button>
        <Button
          positive
          onClick={() => {
            onClose();
            onConfirm(); // Call the callback function passed from Exam component
          }}
        >
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PopUp;
