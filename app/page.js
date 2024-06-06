'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

const task = {id: 1, text: "Todo Test", completed: false}

export default function Home() {
  const [tasks, setTasks] = useState([task]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // rewrite using states

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks') ? 
    JSON.parse(localStorage.getItem('tasks')) : [];
    if (storedTasks) {
      setTasks(storedTasks);
    }
    console.log("use1")
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    const storedTasks = localStorage.getItem('tasks') ? 
    JSON.parse(localStorage.getItem('tasks')) : [];
    console.log(storedTasks);
  }, [tasks]);

  const getFilteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    } else if (filter === 'active') {
      return tasks.filter((task) => !task.completed);
    } else {
      return tasks; 
    }
  };

  const handleAddTask = () => {
    // Implement add task logic here
    setTasks(() => [...tasks, {id: tasks.length + 1, text: text, completed: false}]);
  };

  const handleToggleTask = (id) => {
      // Implement toggle completed/uncompleted task logic here
      const updatedTasks = tasks.map((task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
      // Implement delete task logic here
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
        
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        {/* Medium level: extract todo's listing to TaskList component */}
        {/* Basic level: map through tasks state by using this code: */}
        <TaskList tasks={getFilteredTasks()} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask}/>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> 'n' items left</span>  {/* show how many uncompleted items left */}
          <div>
            <button onClick={() => setFilter("all")} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setFilter("active")} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setFilter("completed")} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={() => alert("Clear completed tasks")}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
