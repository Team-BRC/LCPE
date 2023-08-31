import React from "react";
import { Button, Modal } from "semantic-ui-react";

const PopUp = ({ open, onClose, onConfirm }) => {
  return (
    <Modal size="tiny" open={open} onClose={onClose}>
      <Modal.Header>Confirm Action</Modal.Header>
      <Modal.Content>
        <p>Hey there! You will need to select answer before proceeding!</p>
        <p>You can always flag the question you would like to revisit</p>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={onClose}>
          Okay
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PopUp;
