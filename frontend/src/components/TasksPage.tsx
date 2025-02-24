import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface TasksPageProps {
  authenticated: boolean;
}
const TasksPage: React.FC<TasksPageProps> = ({ authenticated }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/getAll`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    };

    fetchTasks();
  }, [navigate,authenticated]);

  const handleCreateTask = async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/create`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ 
        title: newTitle,
        description: newDescription || undefined,
        isComplete,
      }),
    });

    if (response.ok) {
      const task = await response.json();
      setTasks([...tasks, task]);
      setNewTitle('');
      setNewDescription('');
      setIsComplete(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/delete/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleUpdateTask = async (id: string, task: any) => {
    const newTitle = prompt('New title', task.title) || task.title;
    const newDescription = prompt('New description', task.description) || task.description;
    const isComplete = window.confirm('Mark as complete?');
  
    const updates: any = {
      title: newTitle,
      description: newDescription,
    };
    if (isComplete !== null) {
      updates.isComplete = isComplete;
    }
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/update/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(updates)
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    }
  };
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.description || 'No description'} - {task.isComplete ? 'Complete' : 'Incomplete'}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <button onClick={() => handleUpdateTask(task.id, task)}>
              Update
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Description (optional)"
      />
      <label>
        Complete:
        <input
          type="checkbox"
          checked={isComplete}
          onChange={(e) => setIsComplete(e.target.checked)}
        />
      </label>
      <button onClick={handleCreateTask}>Add Task</button>
    </div>
  );
};

export default TasksPage;
