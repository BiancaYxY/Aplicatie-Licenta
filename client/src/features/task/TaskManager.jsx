import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/authContext";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import { assignTask, deleteTask, fetchTeamMembers, fetchTeamTasks } from "./taskApi";
import "./TaskManager.css";

const TaskManager = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [teamTasks, setTeamTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", assigned_to: "" });

  useEffect(() => {
    const loadData = async () => {
      const [members, tasks] = await Promise.all([
        fetchTeamMembers(),
        fetchTeamTasks()
      ]);
      setTeamMembers(members);
      setTeamTasks(tasks);
    };
    loadData();

    const loadTeamTasks = async () => {
      const tasks = await fetchTeamTasks();
      const members = await fetchTeamMembers();

      const memberMap = {};
      members.forEach((m) => {
        memberMap[m.id] = `${m.first_name} ${m.last_name}`;
      });

      const withNames = tasks.map((task) => ({
        ...task,
        employeeName: memberMap[task.assigned_to] || "Necunoscut",
      }));

      setTeamTasks(withNames);
    };
    loadTeamTasks();

  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    await assignTask(newTask);
    setNewTask({ title: "", description: "", assigned_to: "" });
    const updatedTasks = await fetchTeamTasks();
    setTeamTasks(updatedTasks);
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    const updated = await fetchTeamTasks();
    setTeamTasks(updated);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="task-section">
          <h1>Taskuri echipă</h1>
          <h4>Adaugă un nou Task</h4>

          <form onSubmit={handleAssign} className="task-form">
            <input
              type="text"
              placeholder="Titlu"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Descriere"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              required
            />
            <select
              value={newTask.assigned_to}
              onChange={(e) => setNewTask({ ...newTask, assigned_to: e.target.value })}
              required
            >
              <option value="">Selectează angajat</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.first_name} {member.last_name}
                </option>
              ))}
            </select>
            <button type="submit">Asignează</button>
          </form>
          <h4>Taskurile echipei</h4>
          <div className="task-list">
            {teamTasks.map((task) => (
              <div className="task-card">
                <div className="task-card-content">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p><strong>Angajat:</strong> {task.employeeName}</p>
                </div>
                <div className="task-card-meta">
                  <span className="status"><strong>Status:</strong> {task.status}</span>
                  <button onClick={() => handleDelete(task.id)}>Șterge</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
