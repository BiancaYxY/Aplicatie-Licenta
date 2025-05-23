import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/authContext";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import { fetchAssignedTasks, updateTaskStatus } from "./taskApi";
import "./TaskEmployee.css";

const TaskEmployee = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchAssignedTasks();
      setTasks(data);
    };
    loadTasks();
  }, []);

  const handleStatusChange = async (taskId, status) => {
    await updateTaskStatus(taskId, status);
    const updated = await fetchAssignedTasks();
    setTasks(updated);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="task-section">
          <h1>Taskurile mele</h1>
            <div className="task-list">
              {tasks.map((task) => (
                <div className="task-card" key={task.id}>
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span className={`status-badge status-${task.status.replace(" ", "_")}`}>
                      {task.status.replace("_", " ").replace(/^\w/, c => c.toUpperCase())}
                    </span>
                  </div>
                  <p>{task.description}</p>
                  <select
                    className="task-select"
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  >
                    <option value="pending">În așteptare</option>
                    <option value="in_progress">În desfășurare</option>
                    <option value="completed">Completat</option>
                  </select>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEmployee;
