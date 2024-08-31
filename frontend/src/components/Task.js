import React from 'react';

const Task = ({ task, onUpdate, onDelete }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      <p>Status: {task.status}</p>
      <button onClick={() => onUpdate(task._id)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default Task;
