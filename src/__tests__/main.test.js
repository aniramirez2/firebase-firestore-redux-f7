import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "../pages/Home";

const mockStore = configureStore([]);

describe("Home component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: {
        products: [
          { id: "1", name: "Product 1", price: 10 },
          { id: "2", name: "Product 2", price: 20 },
        ],
      },
    });
  });

  it("should render correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should add a new product", () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(getByPlaceholderText("Product Name"), {
      target: { value: "New Product" },
    });
    fireEvent.change(getByPlaceholderText("Price"), {
      target: { value: "30" },
    });
    fireEvent.click(getByText("Add Product"));

    expect(store.getActions()).toEqual([
      {
        type: "ADD_PRODUCT",
        payload: { id: expect.any(String), name: "New Product", price: 30 },
      },
    ]);
  });

  // Add more test cases for editing and deleting products
});
