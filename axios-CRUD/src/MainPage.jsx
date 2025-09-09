import React, { useEffect, useState } from "react";
import { getData, deleteData } from "./Api_page";
import Form from "./Form";

function MainPage() {
  const [data, setdata] = useState([]);
  const [editing, setEditing] = useState(null);

  const getAllData = async () => {
    try {
      const res = await getData();
      setdata(res.data.products);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteData(id);
      if (res.status === 200) {
        const updatedData = data.filter((cur) => cur.id !== id);
        setdata(updatedData);
      }
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>E-Commerce Products</h1>
      <Form data={data} setdata={setdata} editing={editing} setEditing={setEditing} />

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {data.map((cur) => {
          const { id, title, price, images } = cur;

          return (
            <div
              key={id}
              className="box"
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "15px",
                textAlign: "center",
                background: "#fff",
              }}
            >
              <img
                src={images && images.length > 0 ? images[0] : "https://via.placeholder.com/300"}
                alt={title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <h3>{title}</h3>
              <p>💲 {price}</p>
              <button className="edit" onClick={() => setEditing(cur)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MainPage;
