import React, { useState, useEffect } from "react";
import { addData, updateData } from "./Api_page";

function Form({ data, setdata, editing, setEditing }) {
  const [formdata, setformdata] = useState({
    title: "",
    price: "",
    image: "" 
  });

  useEffect(() => {
    if (editing) {
      setformdata({
        title: editing.title,
        price: editing.price,
        image: editing.image || (editing.images ? editing.images[0] : "")
      });
    }
  }, [editing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddData = async () => {
  try {
    const res = await addData(formdata);

    if (res.status === 200 || res.status === 201) {
      setdata([...data, res.data]);
      setformdata({ title: "", price: "", image: "" });
    } else {
      console.log("Add failed, response:", res);
    }
  } catch (error) {
    console.log("Error adding product:", error);
  }
};

  const handleUpdateData = async () => {
    try {
      const res = await updateData(editing.id, formdata);
      if (res.status === 200) {
        const updatedList = data.map((p) =>
          p.id === editing.id ? { ...p, ...res.data } : p
        );
        setdata(updatedList);
        setEditing(null); 
        setformdata({ title: "", price: "", image: "" });
      }
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      handleUpdateData();
    } else {
      handleAddData();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="title"
        placeholder="Product Title"
        value={formdata.title}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Product Price"
        value={formdata.price}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formdata.image}
        onChange={handleInputChange}
        required
      />
      <input
        type="submit"
        value={editing ? "Update Product" : "Add Product"}
      />
    </form>
  );
}

export default Form;

