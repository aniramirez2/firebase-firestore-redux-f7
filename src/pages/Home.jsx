import { useState } from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [products, setProducts] = useState([
    { id: uuidv4(), name: "Product 1", price: 10 },
    { id: uuidv4(), name: "Product 2", price: 20 },
    { id: uuidv4(), name: "Product 3", price: 30 },
  ]);

  const initialValues = { name: "", price: "" };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      const newProduct = { id: uuidv4(), ...values };
      setProducts([...products, newProduct]);
      resetForm();
    },
  });

  const handleEditProduct = (id, values) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...values } : product
    );
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="mr-2 p-2 border rounded"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="mr-2 p-2 border rounded"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="border p-2 mb-2">
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="name"
                className="mr-2 p-2 border rounded"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <input
                type="number"
                name="price"
                className="mr-2 p-2 border rounded"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
