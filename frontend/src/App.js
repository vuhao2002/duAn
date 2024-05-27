import "./App.css";
import React from "react";
import {
  HomePage,
  LoginPage,
  SignupPage,
  ActivationPage,
  ShopsPage,
  ProductDetailPage,
  ContactPage,
  BadmintonRacketsPage,
  BadmintonShoesPage,
  BadmintonBalosPage,
  CartPage,
  PaymentPage,
  OrderConfirmPage,
  ViewOrderPage,
  UserAccountPage,
  ChangePasswordPage,
  OrdersUserPage,
  FavoriteProductsPage,
  SearchOrderPage,
  BadmintonClothesPage,
  BadmintonAccessoriesPage,
  NewsPage,
  SearchResultPage,
  NewsDetailPage,
  ForgotPasswordPage,
} from "./routes/Routes.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserInbox from "./pages/UserInbox.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/cua-hang" element={<ShopsPage />} />
        <Route path="/inbox/:conversationId" element={<UserInbox />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/san-pham/:id" element={<ProductDetailPage />} />
        <Route path="/vot-cau-long" element={<BadmintonRacketsPage />} />
        <Route path="/giay-cau-long" element={<BadmintonShoesPage />} />
        <Route path="/quan-ao-cau-long" element={<BadmintonClothesPage />} />
        <Route path="/bao-vot-cau-long" element={<BadmintonBalosPage />} />
        <Route
          path="/phu-kien-cau-long"
          element={<BadmintonAccessoriesPage />}
        />
        <Route path="/gio-hang" element={<CartPage />} />
        <Route path="/thanh-toan" element={<PaymentPage />} />
        <Route path="/xac-nhan-don-hang" element={<OrderConfirmPage />} />
        <Route path="/tai-khoan" element={<UserAccountPage />} />
        <Route path="/tai-khoan/view-order/:id" element={<ViewOrderPage />} />
        <Route
          path="/tai-khoan/change-password"
          element={<ChangePasswordPage />}
        />
        <Route path="/tai-khoan/orders" element={<OrdersUserPage />} />
        <Route path="/san-pham-yeu-thich" element={<FavoriteProductsPage />} />
        <Route path="/tra-don-hang" element={<SearchOrderPage />} />
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route path="/tin-tuc/:id" element={<NewsDetailPage />} />
        <Route path="/ket-qua-tim-kiem" element={<SearchResultPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
