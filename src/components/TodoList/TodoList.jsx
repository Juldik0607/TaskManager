import React, { useState } from "react";
import { useTodos } from "../../context/TodoContext";
import Task from "../Task/Task";
import "./TodoList.scss";

const TodoList = () => {
  const { todos, addTodo } = useTodos();
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!taskText.trim()) {
      setError("Task name cannot be empty");
      return;
    }

    addTodo(taskText.trim(), priority, deadline);
    setTaskText("");
    setPriority("medium");
    setDeadline("");
    setError("");
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (!sortField) return 0;

    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === "priority") {
      const priorityMap = { low: 1, medium: 2, high: 3 };
      valA = priorityMap[valA] || 0;
      valB = priorityMap[valB] || 0;
    } else if (sortField === "completed") {
      valA = a.completed ? 1 : 0;
      valB = b.completed ? 1 : 0;
    } else if (sortField === "createdAt" || sortField === "date") {
      valA = new Date(valA || 0);
      valB = new Date(valB || 0);
    }

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA === valB && (sortField === "createdAt" || sortField === "date")) {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    }

    return sortOrder === "asc"
      ? valA > valB
        ? 1
        : valA < valB
        ? -1
        : 0
      : valA < valB
      ? 1
      : valA > valB
      ? -1
      : 0;
  });

  return (
    <div className="todo-container">
      <h1>My Task Manager</h1>

      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={filter === "incomplete" ? "active" : ""}
        >
          Incomplete
        </button>
      </div>

      <div className="counters">
        <p>Total: {todos.length}</p>
        <p>Completed: {todos.filter((t) => t.completed).length}</p>
        <p>Incomplete: {todos.filter((t) => !t.completed).length}</p>
      </div>

      <div className="input-section">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          {error && <p className="error-message">{error}</p>}
        </div>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <button onClick={handleAdd}>Add</button>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("completed")}>
              Status{" "}
              {sortField === "completed"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("text")}>
              Task{" "}
              {sortField === "text" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => handleSort("priority")}>
              Priority{" "}
              {sortField === "priority"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("createdAt")}>
              Created{" "}
              {sortField === "createdAt"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("date")}>
              Deadline{" "}
              {sortField === "date" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTodos.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
