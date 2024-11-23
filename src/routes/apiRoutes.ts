import axios from "axios";

const BASE = "http://127.0.0.1:8000";

// Custom axios instance based on headers needed
export const customAxios = () =>
  axios.create({
    baseURL: BASE,
  });

export const customFormAxios = () => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  return axios.create({
    baseURL: BASE,
    headers: headers,
  });
};

export const API_ROUTES = {
  user: {
    get: "/user/profile/", // + :tel_id
    update: "/user/profile/", // + :tel_id
    register: "/user/register",
  },
  goal: {
    create: "/goals/create",
  },
  tip: {
    user: "/tip/user/", // + :username
    goal: "/tip/goal/", // + :unique_id
  },
};
