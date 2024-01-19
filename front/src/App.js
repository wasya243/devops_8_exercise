import { useState, useEffect } from 'react';
import uuid from 'react-uuid'
import axios from 'axios';

import './App.css';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const TodoItem = ({ todo, handleRemove, handleUpdate }) => {
  return (
    <div className="todo-item">
      <p className={`text ${todo.completed ? 'completed' : ''}`} onClick={() => handleUpdate(todo._id, !todo.completed)}>text: {todo.text}</p>
      <button className="delete-btn" onClick={() => handleRemove(todo._id)}>X</button>
    </div>
  )
}

const TodoItemList = (props) => {
  const { todos, handleRemove, handleUpdate = [] } = props;

  const todoItems = todos.map(todo => (
      <TodoItem
        key={todo._id}
        todo={todo}
        handleRemove={handleRemove}
        handleUpdate={handleUpdate}
      />
    )
  );

  return (
    <div>
      {todoItems}
    </div>
  )
}

const App = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTodoTextInput = (e) => {
    const text = e.target.value;
    setTodoText(text);
  }

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/todos/${currentUserId}`);

      setIsLoading(false);
      setTodos(data);
    } catch (err) {
      setIsLoading(false);
    }
  }

  const handleAddTodo = async (userId, todoText) => {
    try {
      await axios.post(`${BASE_URL}/api/todo`, { text: todoText, userId });

      setTodoText('');
      fetchTodos(userId);
    } catch (err) {
      console.log('error happened during removal', err);
    }
  }

  const handleRemove = async (id, userId) => {
    try {
      await axios.delete(`${BASE_URL}/api/todo/${id}`);

      fetchTodos(userId);
    } catch (err) {
      console.log('error happened during removal', err);
    }
  }

  const handleUpdate = async (id, completed, userId) => {
    try {
      await axios.put(`${BASE_URL}/api/todo/${id}`, { completed });

      fetchTodos(userId);
    } catch (err) {
      console.log('error happened during update', err);
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      const generatedUserId = uuid();
      setCurrentUserId(generatedUserId);
      localStorage.setItem('userId', generatedUserId);
    } else {
      setCurrentUserId(userId);
    }
  }, [])

  useEffect(() => {
    if (currentUserId) {
      fetchTodos();
    }
  }, [currentUserId])

  return (
    <div className="container">
      <div className="search-container">
        <input className="text-input" onInput={handleTodoTextInput} value={todoText} />
        <button onClick={() => handleAddTodo(currentUserId, todoText)}>add todo</button>
      </div>

      {
        !todos.length && !isLoading && <div>no todos</div>
      }
      {
        isLoading && <div>loading</div>
      }
      {
        todos.length && !isLoading && <TodoItemList
          todos={todos}
          handleRemove={(id) => handleRemove(id, currentUserId)}
          handleUpdate={(id, completed) => handleUpdate(id, completed, currentUserId)}
        />
      }
    </div>
  )
}

export default App;
