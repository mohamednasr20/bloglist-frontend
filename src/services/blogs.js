import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => (token = `bearer ${newToken}`);
const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const deleteBlog = async (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, deleteBlog, setToken };
