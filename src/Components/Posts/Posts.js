import React, { useContext, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Input,
} from "@material-ui/core";
import { StoreDataProvider } from "../../Store/Store";
import axios from "axios";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import SnackBarAlert from "../../Common/SnackBarAlert";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 16,
  },
  alignText: {
    textAlign: "left",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Posts = ({ postDetails, edit, setEdit }) => {
  const classes = useStyles();
  const [success, setSuccess] = useState({});
  const title = useRef(postDetails.title);
  const body = useRef(postDetails.body);
  const store = useContext(StoreDataProvider);

  /**
   * deleteHandler deletes the selected post
   * @param id
   */
  const deleteHandler = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        if (Object.keys(response.data).length === 0) {
          setSuccess([true, "Post deleted successfully!", "success"]);
        }
      })
      .catch((err) => {
        setSuccess([true, err, "error"]);
      });
  };

  /**
   * editHandler updated the selected post
   * @param id
   */
  const editHandler = (id) => {
    if (edit === 0) {
      setEdit(postDetails.id);
    } else if (edit === id) {
      if (title.current?.length > 0 && body.current?.length > 0) {
        if (
          title.current === postDetails.title &&
          body.current === postDetails.body
        ) {
          setEdit(0);
          setSuccess([true, "No changes to save!", "warning"]);
        } else {
          axios
            .patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
              title: title.current,
              body: body.current,
            })
            .then((response) => {
              setEdit(0);
              setSuccess([true, "Post updated successfully!", "success"]);
            })
            .catch((err) => {
              setSuccess([true, err, "error"]);
            });
        }
      } else {
        if (title.current?.length === 0 && body.current?.length === 0)
          setSuccess([true, "Please Input Post Title & Content!", "error"]);
        else if (title.current?.length === 0)
          setSuccess([true, "Please Input Title Content!", "error"]);
        else if (body.current?.length === 0)
          setSuccess([true, "Please Input Post Content!", "error"]);
      }
    } else {
      setSuccess([true, "Please update one at a time", "error"]);
    }
  };

  /**
   * loadTitleHandler loads the title based on read / edit mode 
   */
  const loadTitleHandler = () => {
    return edit === postDetails.id ? (
      <Input
        fullWidth
        className={classes.alignText}
        defaultValue={postDetails.title}
        onBlur={(event) => {
          title.current = event.target.value;
        }}
      />
    ) : (
      postDetails.title
    );
  };

  return (
    <>
      <Card className={classes.root} key={postDetails.id} data-testid="post-card">
        <CardHeader
          className={classes.alignText}
          title={loadTitleHandler()}
          subheader={
            postDetails.userId === 1
              ? `${postDetails.user} (me)`
              : postDetails.user
          }
          avatar={
            <Avatar style={{ background: `${postDetails.color}` }}>
              {postDetails.user.split(" ")[0][0]}
              {postDetails.user.split(" ")[1][0]}
            </Avatar>
          }
        />
        <CardContent>
          {edit === postDetails.id ? (
            <TextareaAutosize
              aria-label="minimum height"
              minRows={2}
              style={{ width: "100%" }}
              className={classes.alignText}
              defaultValue={postDetails.body}
              onBlur={(event) => {
                body.current = event.target.value;
              }}
            />
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.alignText}
            >
              {postDetails.body}
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={() =>
              store.setPostContent({
                type: "UPDATE_LIKE",
                value: [postDetails.id, !postDetails.isLiked],
              })
            }
          >
            {postDetails.isLiked ? (
              <FavoriteIcon style={{ color: "#f50057" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
          {postDetails.userId === 1 && (
            <IconButton onClick={() => editHandler(postDetails.id)}>
              {edit === postDetails.id ? <CheckIcon /> : <EditIcon />}
            </IconButton>
          )}
          <IconButton onClick={() => deleteHandler(postDetails.id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <SnackBarAlert success={success} setSuccess={setSuccess} />
    </>
  );
};

export default Posts;