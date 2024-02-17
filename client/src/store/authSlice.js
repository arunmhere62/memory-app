import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const signUp = createAsyncThunk("localLogin", async (form) => {
  try {
    const response = await axios.post("http://localhost:5000/user/signup", form);

    console.log(response.data);
    return response.data;


  } catch (error) {

    const errorMessage = error.response?.data?.message || 'An error occurred.';
    console.log(errorMessage);
    
    console.error("Error in Local signup", error.message);
    throw error;
  }
});

export const userLogin = createAsyncThunk("userLogin", async ({ googleUserId, email, name }) => {
  try {
    const response = await axios.post("http://localhost:5000/user/googleLogin", { googleUserId, email, name });
    return response.data;
  } catch (error) {
    console.error("Error in userLogin:", error);
    throw error; // Re-throw the error to propagate it to the Redux store
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.data = action.payload;
        state.status = "failed";
        state.error = "404";
      });
  },
});

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(signUp.rejected, (state,action) => {
        state.data = action.payload;

        state.status = "failed";
        state.error = "404";
      });
  },
});

export { loginSlice, signUpSlice };
