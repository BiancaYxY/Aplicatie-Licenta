import axios from "axios";

export const loginRequest = async (email, password) => {
  const res = await axios.post(
    "/api/auth/login", // NU mai pune IP sau port
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};
