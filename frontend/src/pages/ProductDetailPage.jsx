import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/Products/ProductDetails.jsx";
import Consultation from "../components/Route/Consultation/Consultation.jsx";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  listProductDetails,
  productCheckUser,
} from "../Redux/Actions/productActions.js";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  dispatch(listProductDetails(id));
  dispatch(productCheckUser(id));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <div className="font-Roboto">
      <Header />
      <ProductDetails />
      <Consultation />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
