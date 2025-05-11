import axios from "axios";

export async function registerUser({ first_name, last_name, email, password, rank, team_lead_id }) {
    const response = await axios.post("/api/auth/register", {
      first_name,
      last_name,
      email,
      password,
      rank,
      team_lead_id,
    });
  
    return response.data;
  }

  export async function getManagers() {
    const response = await axios.get("/api/users/all");
    const allUsers = response.data;
  
    const managers = allUsers
      .filter((user) => user.rank?.toLowerCase() === "manager")
      .map((user) => ({
        id: user.id,
        fullName: `${user.first_name} ${user.last_name}`,
      }));
  
    return managers;
  }