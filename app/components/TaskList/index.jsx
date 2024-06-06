import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({tasks, handleToggleTask, handleDeleteTask}) => {
  // Render TaskItems using TaskItem component
  // Filter tasks by status here
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} {...task} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask}/>
      ))}
    </div>
  );
};

export default TaskList;
