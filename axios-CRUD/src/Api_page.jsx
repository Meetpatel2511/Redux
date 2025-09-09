import axios from "axios";

// API instance
const api = axios.create({
  baseURL: "https://dummyjson.com"
});

// ✅ GET - fetch all products
// https://dummyjson.com/products
export const getData = () => {
  return api.get("/products");
};

// ✅ DELETE - delete product by id
// https://dummyjson.com/products/1
export const deleteData = (id) => {
  return api.delete(`/products/${id}`);
};

// ✅ POST - add new product
// https://dummyjson.com/products/add
export const addData = (data) => {
  return api.post("/products/add", data);
};

// ✅ PUT - update product
// https://dummyjson.com/products/1
export const updateData = (id, updatedData) => {
  return api.put(`/products/${id}`, updatedData);
};
