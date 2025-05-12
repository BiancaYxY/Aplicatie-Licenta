import axios from "axios";

axios.defaults.withCredentials = true;

export async function submitFeedback(data) {
  const response = await axios.post("/api/feedback/add", data);
  return response.data;
}

export async function fetchManagerName(managerId) {
  const response = await axios.get(`/api/users/profile/${managerId}`);
  return response.data.first_name + " " + response.data.last_name;
}

export async function fetchFeedbackSummary() {
  const res = await axios.post("/api/feedback/summary");
  return res.data.summary;
}

export async function fetchNPSReport() {
  const res = await axios.get("/api/feedback/nps");
  return res.data.report;
}

export async function fetchReceivedFeedback() {
  const res = await axios.get("/api/feedback/received");
  return res.data;
}