import React, { useEffect, useReducer } from "react";
import axios from "axios";
export const StoreDataProvider = React.createContext();

const Store = ({ children }) => {
  const updateLikeHandler = (id, isLiked, allPosts) => {
    let previousData = allPosts;
    previousData.forEach((post) => {
      if (post.id === id) {
        post.isLiked = isLiked;
      }
    });
    return previousData;
  };
  const dispatchPostContent = (state, action) => {
    switch (action.type) {
      case "LOAD_POSTS":
        return {
          ...state,
          allPosts: action.value[0],
          userData: action.value[1],
          userName: action.value[2],
          userColor: action.value[3],
        };
      case "UPDATE_LIKE":
        return {
          ...state,
          allPosts: updateLikeHandler(
            action.value[0],
            action.value[1],
            state.allPosts
          ),
        };
      default:
        return { allPosts: [], userData: [], userName: [], userColor: [] };
    }
  };
  const [postContent, setPostContent] = useReducer(dispatchPostContent, {
    allPosts: [],
    userData: [],
    userName: [],
    userColor: [],
  });

  const getPostDetails = async () => {
    let data = [];
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        response.data.forEach((post) => {
          post.isLiked = false;
        });
        data = response.data;
      });
    return data;
  };

  const getUserDetails = async () => {
    let data = [];
    let userName = [];
    let userColor = [];
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        data = response.data;
        data.forEach((user) => {
          userName.push(user.name);
          userColor.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        });
      });
    return [data, userName, userColor];
  };

  useEffect(() => {
    const LoadData = async () => {
      let postData = await getPostDetails();
      let [userData, userName, userColor] = await getUserDetails();
      postData.forEach((data) => {
        data.user = userName[data.userId - 1];
        data.color = userColor[data.userId - 1];
      });
      setPostContent({
        type: "LOAD_POSTS",
        value: [postData, userData, userName, userColor],
      });
    };
    LoadData();
  }, []);

  return (
    <StoreDataProvider.Provider value={{ postContent, setPostContent }}>
      {children}
    </StoreDataProvider.Provider>
  );
};

export default Store;
