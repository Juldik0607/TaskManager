import React, { useState } from "react";
import { useTodos } from "../../context/TodoContext";
import "./Task.scss";

const Task = ({ task }) => {
  const { toggleComplete, deleteTodo, editTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newPriority, setNewPriority] = useState(task.priority);
  const [newDate, setNewDate] = useState(task.date || "");

  const isOverdue = task.date && new Date(task.date) < new Date();

  const handleSave = () => {
    editTodo(task.id, newText, newPriority, newDate);
    setIsEditing(false);
  };

  return (
    <tr
      className={`task-item ${isEditing ? "edit-mode" : ""} ${
        task.completed ? "completed" : ""
      } ${isOverdue ? "overdue" : ""}`}
    >
      <td>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
      </td>

      {isEditing ? (
        <>
          <td>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          </td>
          <td>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </td>
          <td>{new Date(task.createdAt).toLocaleDateString()}</td>
          <td>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </td>
          <td>
            <button onClick={handleSave}>💾</button>
            <button onClick={() => setIsEditing(false)}>❌</button>
          </td>
        </>
      ) : (
        <>
          <td>{task.text}</td>
          <td>
            <span className={`priority ${task.priority}`}>{task.priority}</span>
          </td>
          <td>{new Date(task.createdAt).toLocaleDateString()}</td>
          <td className={isOverdue ? "deadline overdue" : ""}>
            {task.date || "-"}
          </td>
          <td>
            <button onClick={() => setIsEditing(true)}>✏️</button>
            <button onClick={() => deleteTodo(task.id)}>❌</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default Task;
