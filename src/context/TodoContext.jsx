import { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority, date) => {
    const newTodo = {
      id: Date.now(),
      text,
      priority,
      date,
      createdAt: new Date().toISOString(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText, newPriority, newDate) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, priority: newPriority, date: newDate }
          : todo
      )
    );
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleComplete,
        deleteTodo,
        editTodo,
        clearAll,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
