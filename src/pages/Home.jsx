import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  editProducts,
  getCollection,
  updateProducts,
} from "../redux/products/middleware";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(null);
  const initialValues = { name: "", price: "" };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      const newProduct = { ...values };
      if (isEditing) {
        handleEditProduct(id, newProduct);
      } else {
        dispatch(addProduct(newProduct));
      }
      resetForm();
      setIsEditing(false);
    },
    enableReinitialize: true,
  });

  const handleEditProduct = (id, values) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...values } : product
    );
    console.log("arreglo actualizado", updateProducts);
    dispatch(editProducts(updatedProducts, id, values));
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    dispatch(updateProducts(updatedProducts, id));
  };

  useEffect(() => {
    dispatch(getCollection());
  }, [dispatch]);

  const handleEdit = (product) => {
    setIsEditing(true);
    formik.values.name = product.name;
    formik.values.price = product.price;
    setId(product.id);
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
        {isEditing ? (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Editar
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        )}
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="border p-2 mb-2">
            <h5>{product.id}</h5> {product.name} - {product.price}
            <button
              type="button"
              onClick={() => handleDeleteProduct(product.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => handleEdit(product)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
