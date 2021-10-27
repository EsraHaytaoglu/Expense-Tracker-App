
import axios from "axios";

export default () => {
  const token = localStorage.getItem("token") || "";
    // const token2 = token !== null ? JSON.parse(token) : [];

  return axios.create({
    baseURL: "https://expensetracker-be.herokuapp.com",
    headers: {
      Authorization: token,
    },
  });
};