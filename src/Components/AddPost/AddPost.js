import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, TextField, Container } from "@material-ui/core";
import { useRef, useState } from "react";
import axios from "axios";
import SnackBarAlert from "../../Common/SnackBarAlert";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "50%",
    height: "45%",
    [theme.breakpoints.down(400)]:{
      height : '60%'
    },
    [theme.breakpoints.down(300)]:{
      height : '70%'
    },
    background: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  field: {
    marginTop: 20,
  },
  buttonGroup: {
    marginTop: 20,
    textAlign: "right",
  },
}));

const AddPost = ({ add, setAdd }) => {
  const classes = useStyles();
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [success, setSuccess] = useState(false);
  const title = useRef("");
  const content = useRef("");

  /**
   * saveHandler checks for values of title and content field and if available saves successfully 
   */
  const saveHandler = () => {
    if (title.current?.length > 0 && content.current?.length > 0) {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          title: title.current,
          body: content.current,
          userId: 1,
        })
        .then((response) => {
          if (response.data && response.data.id && response.data.id === 101) {
            setSuccess([true, "Post added successfully!", "success"]);
          } else {
            setSuccess([
              true,
              "Failed to add Post. Please try again later!",
              "error",
            ]);
          }
          onCloseHandler();
        })
        .catch((err) => {
          setSuccess([true, err, "error"]);
        });
    } else {
      if (title.current?.length === 0) setTitleError(true);
      if (content.current?.length === 0) setContentError(true);
    }
  };

  /**
   * onCloseHandler closes the modal and resets all value
   */
  const onCloseHandler = () => {
    setAdd(false);
    setTitleError(false);
    setContentError(false);
    title.current = "";
    content.current = "";
  };

  return (
    <>
      <Modal
        data-testid = "post-modal"
        open={add}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            setAdd(false);
          }
        }}
      >
        <Container className={classes.container}>
          <div className={classes.field}>
            <TextField
              id="filled-basic"
              label="Title"
              variant="outlined"
              data-testid="add-post-title"
              fullWidth
              error={titleError}
              onBlur={(event) => {
                title.current = event.target.value;
              }}
              helperText={titleError && "please enter the title."}
            />
          </div>
          <div className={classes.field}>
            <TextField
              id="filled-basic"
              label="Content"
              variant="outlined"
              data-testid="add-post-body"
              fullWidth
              multiline
              minRows={4}
              onBlur={(event) => {
                content.current = event.target.value;
              }}
              error={contentError}
              helperText={contentError && "please enter the content."}
            />
          </div>
          <div className={classes.buttonGroup}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 20 , marginBottom : 10 }}
              onClick={() => saveHandler()}
            >
              SAVE
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{  marginBottom : 10 }}
              onClick={() => onCloseHandler()}
            >
              CANCEL
            </Button>
          </div>
        </Container>
      </Modal>
      <SnackBarAlert success={success} setSuccess={setSuccess} />
    </>
  );
};

export default AddPost;
