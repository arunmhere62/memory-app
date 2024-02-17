import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  try {
    const response = await axios.get("http://localhost:5000/posts");
    return response.data; // Return the data from the response
  } catch (error) {
    throw error; // Let Redux Toolkit handle the error
  }
});

export const getPost = createAsyncThunk("post/getPost", async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createPost = createAsyncThunk("post/createPost", async (newPost) => {
  try {
    const response = await axios.post("http://localhost:5000/posts", newPost);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const updatePost = createAsyncThunk("post/updatePost", async ({postData , currentId}) => {
  try {
    const response = await axios.patch(`http://localhost:5000/posts/${currentId}`, postData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = "404";
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

const editPostSlice = createSlice({
  name: "editPost",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = "404";
      });
  },
});

const updateSlice = createSlice({
  name: "updatePost",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updatePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = "404";
      });
  },
});

export { postSlice, editPostSlice, updateSlice };
