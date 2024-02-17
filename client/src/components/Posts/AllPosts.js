import React, { useMemo, useState } from "react";
import Post from "./post/post";
import Form from "../Form/Form";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const AllPosts = ({setCurrentId}) => {
  
  const { data: AllPosts, status: status, error: error } = useSelector((state) => state.posts);
 
  return (
    <>
      {status === "loading" ? (
        <h1>loading...</h1>
      ) : status === "success" ? (
        <>
          <Post
            post={AllPosts}
            setCurrentId={setCurrentId}
          />
        </>
      ) : (
        <h1></h1>
      )}
    </>
  );
};

export default AllPosts;
