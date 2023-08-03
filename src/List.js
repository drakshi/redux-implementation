import React from 'react';
import {useState} from 'react';
import {CURRENCY} from './constants/currency'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from './store/reducers/user';
import { addTodo, completeTodo, fetchTodos, removeTodo, setSelectedTodo, updateTodo } from './store/reducers/todo';
import { useSelector } from 'react-redux';
import { selectSelectedTodo, selectTodoList } from './store/selectors/todo';
import {selectUserList} from './store/selectors/user';
const List = () => {
    
    const dispatch = useDispatch();
    const todolist = useSelector(selectTodoList);
    const userList = useSelector(selectUserList);
    const selectedTodo = useSelector(selectSelectedTodo);
    const [title ,setTitle] = useState();
    const [amount, setAmount] = useState();
    const [currency , setCurrency] = useState();
    const [users, setUsers] = useState();

     useEffect(() =>{
      
      //console.log('reached');
      console.log(todolist);
      dispatch(fetchUsers());
      dispatch(fetchTodos());
    },[])
    
    useEffect(() => {
      setTitle(selectedTodo?.text);
      setAmount(selectedTodo?.amount);
      setCurrency(selectedTodo?.currency);
      setUsers(selectedTodo?.user);
      console.log("SELECTED TODO", selectedTodo);
    }, [selectedTodo]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || !amount || !currency || !users){
          alert('Fields can not be empty');
          return;
        }
        const userSelected = todolist.find((todoitem) => {return selectedTodo?.id === todoitem?.id})
        
        if(userSelected){
          dispatch(updateTodo({
            id: userSelected.id,
          data: {
            text: title,
            amount: amount,
            currency: currency,
            user: users,
            completed: false
          }
          }))

          console.log(userSelected);
        }
        else{
          dispatch(addTodo({
            id:Math.floor(Math.random() * 10),
            text: title,
            amount: amount,
            currency: currency,
            user: users,
            completed: false
          }));
        }
       

        setTitle("");
        setAmount("");
        setCurrency("");
        setUsers("");
        console.log(title, amount,currency,users);
    }
    const handleCompleteTodo =(id) =>{
      console.log(todolist);
      dispatch(completeTodo(id));

    }
    const handleUpdate =(id) =>{
      
      dispatch(setSelectedTodo(id))
      dispatch(removeTodo(id));

    }
    const handleRemoveTodo= (id) =>{
      dispatch(removeTodo(id))
    }
    return(
        <div>
            <form onSubmit={handleSubmit} 
            style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px 25%",
          gap: "5px"
        }}>
                <input name ='title' placeholder ='enter your title' onChange={(e) => setTitle(e.target.value)} value={title} required/>
                <input name ='amount' min = '0' placeholder ='set your amount' type='number' onChange={(e) => setAmount(e.target.value)} value={amount} required />
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
                    {CURRENCY.map((curr, i) => (<option value={curr.id} key ={i}>{curr.label}</option>))}
                </select>
                <select value= {users} onChange={(e) => setUsers(e.target.value)} required>
                    {userList.map((user) => (<option value ={user.id} >{user.fullName}</option>))}
                </select>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            {todolist.map((todo) => (
            <div display={{ display: "flex", gap: "5px" }} style={{textAlign:'center'}}>
              <div key = {todo.id}>
                <h3>{todo.text}</h3>
                <p>{todo.currency}</p>
                <span>user : {userList[todo.user].fullName}<p>{todo.amount}</p></span>
                
                </div>
              { !todo.completed ? <button onClick={() => handleCompleteTodo(todo.id)}>
                Approve
              </button> : <p style={{color: 'green'}}>Approved</p>}
            
            
              <button
                disabled={todo.completed}
                onClick={() => handleUpdate(todo.id)}
              >
                Update
              </button>
            
            <button onClick={() => handleRemoveTodo(todo.id)}>Delete</button>
          </div>))}
        </div>
    )
}

export default List;
/**import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CURRENCY } from './constants/currency';
import {
  addTodo,
  completeTodo,
  fetchTodos,
  removeTodo,
  resetSelectedTodo,
  setSelectedTodo,
  updateTodo
} from "./store/reducers/todo";
import { fetchUsers } from "./store/reducers/user";
import { selectSelectedTodo, selectTodoList } from "./store/selectors/todo";
import { selectUserList } from "./store/selectors/user";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodoList);
  const users = useSelector(selectUserList);
  const selectedTodo = useSelector(selectSelectedTodo);
  const [todo, setTodo] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    setTodo(selectedTodo?.text);
    setAmount(selectedTodo?.amount);
    setCurrency(selectedTodo?.currency);
    setUser(selectedTodo?.user);
    console.log("called", selectedTodo);
  }, [selectedTodo]);
  console.log(todos);
  const handleAddTodo = (e, text = "") => {
    e.preventDefault();
    if (
      !todo ||
      !amount ||
      !currency ||
      !user ||
      todo === "" ||
      amount === "" ||
      currency === "" ||
      user === ""
    ) {
      alert("Empty value");
      return;
    }
    const userSelected = todos.find(
      (item) => item?.id === parseInt(selectedTodo?.id, 10)
    );

    if (userSelected) {
      dispatch(
        updateTodo({
          id: userSelected.id,
          data: {
            text: todo,
            amount: amount,
            currency: currency,
            user: parseInt(user, 10),
            completed: false
          }
        })
      );
    } else
      dispatch(
        addTodo({
          id: Date.now(),
          text: todo,
          amount: amount,
          currency: currency,
          user: user,
          completed: false
        })
      );
    dispatch(resetSelectedTodo());
    setTodo("");
    setAmount("");
    setCurrency("");
    setUser("");
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleCompleteTodo = (id) => {
    dispatch(completeTodo(id));
  };
  const handleUpdate = (id) => {
    dispatch(setSelectedTodo(id));
    dispatch(removeTodo(id));
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px 25%",
          gap: "5px"
        }}
        onSubmit={handleAddTodo}
      >
        <input
          name="Title"
          placeholder="Enter your text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <input
          min="0"
          name="amount"
          placeholder="Enter amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={currency} // ...force the select's value to match the state variable...
          onChange={(e) => setCurrency(e.target.value)} // ... and update the state variable on any change!
        >
          {CURRENCY.map((item) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </select>
        <select
          value={user} // ...force the select's value to match the state variable...
          onChange={(e) => setUser(e.target.value)} // ... and update the state variable on any change!
        >
          {users
            ? users.map((item) => (
                <option value={item.id}>{item.fullName}</option>
              ))
            : null}
        </select>
        <button onClick={handleAddTodo}>Submit</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            style={{
              margin: "20px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
            key={todo.id}
          >
            <div>
              <bold style={{ color: "green" }}>
                {todo.completed ? "APPROVED: " : ""}
              </bold>{" "}
              title:
              {todo.text} • amount:{todo.amount}{" "}
              {CURRENCY.find((item) => item?.value === todo?.currency)?.label} •
              user:{" "}
              {
                users.find(
                  (item) => parseInt(item?.id, 10) === parseInt(todo?.user, 10)
                )?.fullName
              }
            </div>
            <div display={{ display: "flex", gap: "5px" }}>
              {!todo.completed && (
                <button onClick={() => handleCompleteTodo(todo.id)}>
                  Approve
                </button>
              )}
              {
                <button
                  disabled={todo.completed}
                  onClick={() => handleUpdate(todo.id)}
                >
                  Update
                </button>
              }
              <button onClick={() => handleRemoveTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
 */