import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = async () => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const update = async (newObject) => {
  const newObjectID = newObject.id;
  const newObjectUser = newObject.user;
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, {
    headers: {
      Authorization: token,
    },
  });
  if (!response.user) {
    response.data.user = newObjectUser;
  }
  if (!response.id) {
    response.data.id = newObjectID;
  }
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const remove = async (object) => {
  const response = await axios.delete(`${baseUrl}/${object.id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export default { getAll, setToken, create, update, remove };
