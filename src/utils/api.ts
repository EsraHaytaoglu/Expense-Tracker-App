import axios from "axios";

export default () => {
  const token = JSON.parse(localStorage.getItem("token")!);

  return axios.create({
    baseURL: "https://expensetracker-be.herokuapp.com",
    headers: {
      Authorization: token
    },
  });
};