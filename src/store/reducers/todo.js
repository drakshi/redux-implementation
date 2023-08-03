import {createAsyncThunk , createSlice} from '@reduxjs/toolkit';
import {API} from '../../api';
import to  from 'await-to-js' ;

const todoInitialState = {
    list : [],
    isLoading : false,
    selectedTodo : null
}

const todoSlice = createSlice({
    name: "todo",
    initialState : todoInitialState,
    reducers : {
        addTodo : (state,action) =>{
             state.list.push(action.payload)
        },
        setTodo : (state, action) => {
            state.list = action.payload
        },
        updateTodo : (state, action) => {
            state.list = state.list.map((item) => 
                item.id === action.payload.id ?
                {...item, ...action.payload.data}: 
                item
            )
        },
        removeTodo : (state,action) => {
            state.list = state.list.filter((todo) => todo.id != action.payload)
        },
        completeTodo : (state,action) => {
            const todo = state.list.find((todo) => todo.id === action.payload)
            if(todo){
                todo.completed = true;
            }
            console.log('completed task')
        },
        setSelectedTodo : (state, action) => {
            state.selectedTodo = state.list.find((todo) => todo.id === action.payload)
        },
        resetSelectedTodo : (state, action) => {
            state.selectedTodo = null
        }
     }
});
export const fetchTodos = createAsyncThunk("todo/fetchtodos" , async ( params, {dispatch}) => {
    const [error , response] = await to(API.TODO.get());

    dispatch(setTodo(response));
})
export const {
    addTodo,
    setTodo,
    setSelectedTodo,
    removeTodo,
    completeTodo,
    resetSelectedTodo,
    updateTodo
  } = todoSlice.actions;
  export default todoSlice.reducer;