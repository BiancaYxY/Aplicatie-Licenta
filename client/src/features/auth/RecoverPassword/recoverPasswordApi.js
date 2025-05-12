import axios from "axios";

export async function resetPassword({ email, newPassword }) {
  console.log("🔁 Apel resetPassword cu:", email, newPassword);
  const response = await axios.put("/api/users/update-password", {
    email,
    newPassword,
  });

  return response.data;
}