import axios from "axios";

axios.defaults.withCredentials = true;

export async function fetchUserProfile(userId) {
  try {
    const response = await axios.get(`/api/users/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error at fetchUserProfile:", error);
    throw error;
  }
}
export async function fetchAnnouncements() {
  try {
    const response = await axios.get("/api/announcements");
    return response.data;
  } catch (err) {
    console.error("Error getting announcements!", err);
    return [];
  }
}