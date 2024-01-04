import React from "react";
import { useRouter } from 'next/router';
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const formatTime = timeInSeconds => {
  //time seconds -> string
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return `${String(hours).padStart(2, "0")} hours, 
  ${String(minutes).padStart(2, "0")} 
  minutes, and ${String(seconds).padStart(2, "0")} seconds`;
};

function ExitButton({ remainingTime, totalSeconds, test }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button color="red"><Icon size="large" link name='sign out alternate' /></Button>}
      id="exitAndViewResults"
    >
      <Header icon>
        <Icon name="archive" />
        End Exam
      </Header>
      <Modal.Content id="content">
        {totalSeconds > 0 ? (
          <p>
            You still have {formatTime(remainingTime)} left, are you sure you
            want to end your exam?
          </p>
        ) : (
          <p>
            Once you end your exam, you cannot change your answers. Are you sure
            you want to end?
          </p>
        )}
      </Modal.Content>
      <Modal.Actions>
        <div className="flex flex-row items-center justify-center">
          <Button
            basic
            color="red"
            inverted
            onClick={() => {
              localStorage.removeItem("timer");
              localStorage.setItem("test", JSON.stringify(test));
              router.push("/Results");
            }}
          >
          <h6> <Icon name="remove" /> Finish and View Results </h6>
          </Button>
          <Button color="green" inverted onClick={() => setOpen(false)}>
            <h6> <Icon name="checkmark" /> Continue Exam</h6>
          </Button>
        </div>
      </Modal.Actions>
    </Modal>
  );
}

export default ExitButton;
