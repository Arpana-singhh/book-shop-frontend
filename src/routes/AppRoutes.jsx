import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AllBooks from "../pages/AllBooks";
import Login from "../pages/Login";
import MainLayout from "../layouts/MainLayout";
import Cart from "../pages/Cart";
import EmailVerify from "../pages/EmailVerify";
import ResetPassword from "../pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import {PublicRoute, PrivateRoute, AdminRoute} from './routeGuards'
import BookDetail from "../components/BookDetail";
import Favourites from "../components/Profile/Favourites";
import OrderHistory from "../components/Profile/OrderHistory";
import Settings from "../components/Profile/Settings";
import AllOrder from "../components/Profile/AllOrder";
import AddBook from "../components/Profile/AddBook";
import { AppContent } from "../../context/AppContext";
import UpdateBook from "../pages/UpdateBook";


const AppRoutes = () => {
  const { userRole } = useContext(AppContent);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />}>
          <Route
            index
            element={
              localStorage.getItem("authToken") && localStorage.getItem("userRole") === "admin" ? (
                <Navigate to="/profile/all-orders" replace />
              ) : localStorage.getItem("authToken") ? (
                <Navigate to="/profile/favourites" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Sub-routes */}
          <Route path="favourites" element={<Favourites />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="settings" element={<Settings />} />
          <Route path="all-orders" element={
            <AdminRoute>
               <AllOrder />
            </AdminRoute>
          }/>
          <Route path="add-book" element={
            <AdminRoute>
              <AddBook />
            </AdminRoute>
            
            } />
        </Route>
          <Route path="/books" element={<AllBooks />} />
          <Route path="/book-detail/:id" element={<BookDetail />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />

          <Route path="/update-book/:id" 
              element={
                <AdminRoute>
                  <UpdateBook/>
                </AdminRoute>
              }
          />            

          {/* ✅ Public only routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <PublicRoute>
                <EmailVerify />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
