import axios from 'axios';
const baseUrl = './api/persons';

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (personObject) => {
  return axios.post(baseUrl, personObject).then((response) => response.data);
};

const update = (id, personObject) => {
  return axios
    .put(`${baseUrl}/${id}`, personObject)
    .then((response) => response.data);
};

const destroy = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const persons = { getAll, create, update, destroy };

export default persons;
