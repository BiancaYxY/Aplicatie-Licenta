import axios from "axios";

export const loginRequest = async (email, password) => {
  const res = await axios.post(
    "/api/auth/login",
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};
