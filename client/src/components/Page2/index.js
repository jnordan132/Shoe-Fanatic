import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import CategoryMenu from "../../components/CategoryMenu";
import ProductItem from "../../components/ProductItem";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { useSelector, useDispatch } from "react-redux";
import { Router, Link } from "react-router-dom";

function Page2() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }
  }
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(2, pageNumber + 1));
  };
  return (
    <div style={{ marginTop: "1%" }}>
      <CategoryMenu />
      <div className="mx-2">
        <div
          className="flex-row"
          style={{ marginTop: ".8%", marginLeft: "18%", marginRight: "18%" }}
        >
          {filterProducts()
            .slice(15, 30, state.showItems)
            .map((product) => (
              <ProductItem
                key={product._id}
                _id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
              />
            ))}
        </div>
        {loading ? <img src={spinner} alt="loading" /> : null}
        <br />
      </div>
      <div>
        <div>
          <p>Page 2</p>
          <Link to="/">
            <button onClick={window.scrollTo(0, 0)}>Back</button>
          </Link>
          <Link to="/page3">
            <button onClick={window.scrollTo(0, 0)} component={Page2}>
              Next
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page2;
