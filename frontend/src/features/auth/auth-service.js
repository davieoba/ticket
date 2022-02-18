import axios from "axios";
const BASE_URL = "http://localhost:5000/api/v1/users";

const register = async (userData) => {
  const response = await fetch("http://localhost:5000/api/v1/users/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "content-type": "application/json",
    },
  });
  // console.log(response);
  // if (response.ok === false || response.status === (400 || 500)) return;
  // console.log("the code got here");
  const data = await response.json();

  // console.log(data);
  return data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const login = async (userData) => {
  const response = await fetch("http://localhost:5000/api/v1/users/login", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = response.json();
  return data;
};

export const authService = {
  register,
  logout,
  login,
};

// sage
// bodunrindavidbond@gmail.com
// 123456
