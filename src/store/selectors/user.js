import { createSelector } from "@reduxjs/toolkit";

export const selectUserState = (state) => state.user;

export const selectUserList = createSelector(
  selectUserState,
  (userState) => userState.list
);
