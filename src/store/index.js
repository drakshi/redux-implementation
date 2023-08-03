// store.js
import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from '../store/reducers/todo'
import UserReducer from "../store/reducers/user";

const store = configureStore({
  reducer: {
    todo: TodoReducer,
    user: UserReducer,
  },
});

export default store;


