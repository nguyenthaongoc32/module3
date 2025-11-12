import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./component/context/AuthContext";
import { ToastContainer } from "react-toastify";

import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import ForgotPassword from "./component/auth/ForgotPassword";
import Dashboard from "./component/pages/Dashboard";
import MainLayout from "./component/layout/MainLayout";
import Product from "./component/pages/Product";
import Favorites from "./component/pages/Favorites";
import OrderList from "./component/pages/OrderList";
import Pricing from "./component/pages/Pricing";
import Error from "./component/pages/Error";
import Todo from "./component/pages/Todo";
import Profile from "./component/pages/Profile";

export const backendUrl = import.meta.env.VITE_API_URL;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth pages - no layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Pages with MainLayout */}
          <Route
            path="/*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<Product />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="orderLists" element={<OrderList />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="inbox" element={<Error />} />
                  <Route path="todo" element={<Todo />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="productStock" element={<Error />} />
                  <Route path="*" element={<Error />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
