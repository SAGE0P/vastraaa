import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import UserLayout from "./components/Layout/UserLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ConfirmPage from "./pages/ConfirmPage";
import Collection from "./pages/Collection";

// Components
import ProductD from "./components/Products/ProductD";
import CheckOut from "./components/Cart/CheckOut";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 Authenticated/Private Routes */}
        <Route path="/profile" element={<Profile />} />

        {/* 🧭 Main User Layout with nested routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="collection" element={<Collection />} />
          <Route path="men" element={<Collection />} />
          <Route path="women" element={<Collection />} />
          <Route path="top" element={<Collection />} />
          <Route path="bottoms" element={<Collection />} />
          <Route path="mens-collection" element={<Collection />} />
          <Route path="womens-collection" element={<Collection />} />
          <Route path="products/:id" element={<ProductD />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="order-confirmation" element={<ConfirmPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
