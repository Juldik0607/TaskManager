import React from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

const App = () => {
  return (
    <TodoProvider>
      <div className="App">
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
