import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com"
});

export const getData = () => {
  return api.get("/products");
};

export const deleteData = (id) => {
  return api.delete(`/products/${id}`);
};

export const addData = (data) => {
  return api.post("/products/add", data);
};

export const updateData = (id, updatedData) => {
  return api.put(`/products/${id}`, updatedData);
};

