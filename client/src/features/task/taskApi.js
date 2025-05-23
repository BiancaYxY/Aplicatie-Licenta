import axios from "axios";

axios.defaults.withCredentials = true;

export async function fetchAssignedTasks() {
  const res = await axios.get("/api/tasks/");
  return res.data;
}

export async function updateTaskStatus(taskId, status) {
  return await axios.put("/api/tasks/update-status", { taskId, status });
}

export async function assignTask(task) {
  return await axios.post("/api/tasks/assign", task);
}

export async function deleteTask(taskId) {
  return await axios.delete(`/api/tasks/${taskId}`);
}

export async function fetchTeamMembers() {
  const response = await axios.get("/api/team/members");
  return response.data;
}

export async function fetchTeamTasks() {
  const response = await axios.get("/api/tasks/team");
  return response.data;
}