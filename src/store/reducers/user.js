import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import to from 'await-to-js';
import {API} from '../../api';

const userInitialState = {
    list: [],
    isLoading : false
}

const userSlice = createSlice({
    name:  'user',
    initialState : userInitialState,
    reducers :{
        setUsers : (state, action) => {
            state.list = action.payload
        }
    }
})

export const fetchUsers = createAsyncThunk('users/fetchusers' , async (params, {dispatch}) => {
    const [error, response ] = await to(API.USER.get());
    console.log(response);
    dispatch(setUsers(response));
})

export const {
    setUsers
} = userSlice.actions;
export default userSlice.reducer;
