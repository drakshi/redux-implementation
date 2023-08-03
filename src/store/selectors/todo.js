import { createSelector } from "@reduxjs/toolkit";

export const selectTodoState = ((state) => state.todo) ;

export const selectTodoList = createSelector(
    selectTodoState,
    (todoState) => todoState.list
  );
  export const selectSelectedTodo = createSelector(
    selectTodoState,
    (todoState) => todoState.selectedTodo
  );
  export const selectTodoLoading = createSelector(
    selectTodoState,
    (todoState) => todoState.isLoading
  );
  
  export const selectTodoById = createSelector(
    selectTodoList,
    (_, todoId) => todoId,
    (todoList, todoId) => todoList.find((todo) => todo.id === todoId) || null
  );
  
  export const selectCompletedTodos = createSelector(selectTodoList, (todoList) =>
    todoList.filter((todo) => todo.completed)
  );
  
  export const selectActiveTodos = createSelector(selectTodoList, (todoList) =>
    todoList.filter((todo) => !todo.completed)
  );
  
  export const selectTotalTodoCount = createSelector(
    selectTodoList,
    (todoList) => todoList.length
  );
    