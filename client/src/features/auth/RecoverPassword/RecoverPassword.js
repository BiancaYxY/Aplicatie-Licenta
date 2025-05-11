import axios from "axios";

export default async function resetPassword({ email, newPassword }) {
  const response = await axios.put("/api/users/update-password", {
    email,
    newPassword,
  });

  return response.data;
}