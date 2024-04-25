import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, getCollection } from "../redux/products/middleware";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(
    (productsReducer) => productsReducer.products
  );

  const initialValues = { name: "", price: "" };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const newProduct = { ...values };
      console.log("newProduct", newProduct);
      dispatch(addProduct(newProduct));
      setSubmitting(true);
      //resetForm();
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

  useEffect(() => {
    dispatch(getCollection());
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        className="mb-4"
      >
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
            <form>
              <input
                type="text"
                name="name"
                className="mr-2 p-2 border rounded"
                onChange={formik.handleChange}
                value={product.name || formik.values.name}
              />
              <input
                type="number"
                name="price"
                className="mr-2 p-2 border rounded"
                onChange={formik.handleChange}
                value={product.price || formik.values.price}
              />
              <button
                type="button"
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
