import React, { useState, useEffect } from 'react';
import './App.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return storedTasks;
  });
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setTotalTasks(tasks.length);
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const editTask = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filterTasks = () => {
    switch (filter) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo List App using React-JS</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active/Pending</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <p><b>Total Tasks: {totalTasks} </b> </p>
      <ul>
        {filterTasks().map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span onClick={() => toggleTaskCompletion(task.id)}>
              {task.text}
            </span>
            <div className="icons">
              <span
                className="edit-icon"
                onClick={() => {
                  const newText = prompt('Edit task:', task.text);
                  if (newText !== null) {
                    editTask(task.id, newText);
                  }
                }}
              >
                ✎
              </span>
              <span
                className="delete-icon"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this task?'
                    )
                  ) {
                    deleteTask(task.id);
                  }
                }}
              >
                🗑
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
