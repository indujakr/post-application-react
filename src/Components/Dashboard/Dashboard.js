import { useCallback, useContext, useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import { StoreDataProvider } from "../../Store/Store";
import { Button, CircularProgress, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddPost from "../AddPost/AddPost";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "50%",
    margin: "auto",
  },
  spinner: {
    marginTop: "25%",
    margin: "auto",
  },
  alignText: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px",
  },
}));

const Dashboard = () => {
  const store = useContext(StoreDataProvider);
  const [edit, setEdit] = useState(0);
  const [add, setAdd] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loadPosts, setLoadPosts] = useState([]);
  const [getAllPosts, setGetAllPosts] = useState([]);
  const classes = useStyles();

  /**
   * loadData loads more post data whenever the scroll bar reached bottom of screen 
   */
  const loadData = useCallback(() => {
    let splicedData = [];
    if (getAllPosts.length >= 10) {
      splicedData.push(...getAllPosts.splice(0, 10));
      setLoadPosts((prev) => {
        return [...prev, ...splicedData];
      });
      getAllPosts.length === 0 ? setHasMore(false) : setHasMore(true);
    } else {
      splicedData.push(...getAllPosts.splice(0, getAllPosts.length));
      setLoadPosts((prev) => {
        return [...prev, ...splicedData];
      });
      setHasMore(false);
    }
  }, [getAllPosts]);

  /**
   * useEffect to set initial value of getAllPosts
   */
  useEffect(() => {
    if (store.postContent.allPosts?.length > 0) {
      setLoadPosts([]);
      setGetAllPosts([...store.postContent.allPosts]);
    }
  }, [store.postContent.allPosts]);

  /**
   * useEffect to load initial data on screen
   */
  useEffect(() => {
    if (getAllPosts.length > 0) {
      loadData();
    }
  }, [getAllPosts, loadData]);

  return store.postContent.allPosts.length === 0 ? (
    <Box className={classes.spinner} data-testid='post-dashboard'>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <div className={classes.root}>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.alignText}
            onClick={() => setAdd(true)}
          >
            <AddIcon /> Add Post
          </Button>{" "}
        </div>
        <InfiniteScroll
          dataLength={getAllPosts?.length}
          next={loadData}
          hasMore={hasMore}
          loader={loadPosts?.length > 0 && <h2>Loading...</h2>}
        >
          {loadPosts?.map((post) => {
            return (
              <Posts
                key={post.id}
                postDetails={post}
                edit={edit}
                setEdit={setEdit}
              />
            );
          })}
        </InfiniteScroll>
      </div>
      <AddPost add={add} setAdd={setAdd} />
    </>
  );
};

export default Dashboard;
