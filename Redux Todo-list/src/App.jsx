import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const addTodo = () => {
    if (task.trim() === "") return;
    if (editId) {
      dispatch({ type: "UPDATE_TODO", payload: { id: editId, text: task } });
      setEditId(null);
    } else {
      dispatch({ type: "ADD_TODO", payload: task });
    }
    setTask("");
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setTask(text);
  };

  return (
    <div className="container">
      <h1>Redux To-Do List</h1>
      <div className="input-box">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
        />
        <button onClick={addTodo}>{editId ? "Update" : "Add"}</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <span onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}>
              {todo.text}
            </span>
            <div className="actions">
              <button onClick={() => startEdit(todo.id, todo.text)}>✏️</button>
              <button onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
