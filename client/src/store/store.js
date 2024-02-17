import { configureStore } from "@reduxjs/toolkit";
import { postSlice, editPostSlice, updateSlice } from "./postSlice";
import { loginSlice, signUpSlice } from "./authSlice";
const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    editPost: editPostSlice.reducer,
    updatePost: updateSlice.reducer,
    googleLogin: loginSlice.reducer,
    signUp: signUpSlice.reducer,
  },
});

export default store;
