import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = (newObject) => {
  const req = axios.post(baseUrl, newObject);
  return req
    .then((res) => {
      res.data;
      console.log("created", res.data);
    })
    .catch((err) => {
      console.log("error" + err);
    });
};

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => {
    console.log("deleted");
    return res.data;
  });
};

const update = (id, obj) => {
  const req = axios.put(`${baseUrl}/${id}`, obj);
  return req.then((res) => {
    return res.data;
  });
};
export default { create, getAll, remove, update };
