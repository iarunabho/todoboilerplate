import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef();
  const LOCAL_STORAGE_KEY = 'todoApp.todos';
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos)
  }, [])
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  function toggleTodo(id){
    const newTodos = [...todos];
    const todo = newTodos.find(todo =>  todo.id === id)
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }
  function handleAddTodo(e){
    e.preventDefault();
    const name = todoNameRef.current.value;
    if (name === '') return;
    console.log(name);
    setTodos(prevTodos =>{
      return [...prevTodos, {
        id: uuidv4(), name: name, complete: false
      }]
    })
    todoNameRef.current.value = null
  }
  function handleClearTodos(){
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos); 
}
  return (
    <form>
    <TodoList todos= {todos} toggleTodo={toggleTodo}/>
    {/* using ref to store the input value */}
    <input ref={todoNameRef} type="text" />
     {/*using handleAddTodo to call a function when the button is clicked  */}
    <button type="submit" onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}> Clear Completed Todos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </form>
  )
}

export default App;
