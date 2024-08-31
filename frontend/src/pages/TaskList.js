import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const handleUpdate = (id) => {
    const task = tasks.find((task) => task._id === id);
    setSelectedTask(task);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleSave = () => {
    setSelectedTask(null);
    const fetchTasks = async () => {
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setTasks(response.data);
    };
    fetchTasks();
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <Task key={task._id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
      ))}
      <TaskForm task={selectedTask} onSave={handleSave} />
    </div>
  );
};

export default TaskList;
