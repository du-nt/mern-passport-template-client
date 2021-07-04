import axios from "axios";

// axios.defaults.baseURL = "/"

export const getDataAPI = async (url) => await axios.get(`/api/${url}`);

export const postDataAPI = async (url, data) =>
  await axios.post(`/api/${url}`, data);

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
