import React from "react";
import TodoItem from "./TodoItem";
const TodoBoard = ({taskList, toggleComplete, deleteTask}) => {
  return (
    <div>
      <h2>Todo List</h2>
      {taskList.length > 0 
        ? taskList.map((item)=>
        <TodoItem 
          key={item._id} 
          item={item}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />)
        : <h2>There is no Item to show</h2>}
      {/* <TodoItem/> will be here once we get the todoList */}
    </div>
  );
};

export default TodoBoard;
