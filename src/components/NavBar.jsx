import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { Modal, Button } from "antd";
const NavBar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const { backendUrl, setUserData, isLoggedin, setIsLoggedin } =
    useContext(AppContent);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const navigate = useNavigate();
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "api/auth/logout");
      if (data.success) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");

        toast.success(data.message);
        setIsLoggedin(false);
        setUserData(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="layout-fixer py-[5px] z-[2] sticky w-full top-0 bg-white">
        <div className="flex justify-center sm:justify-between items-center flex-wrap gap-[20px] sm:gap-0">
          <Link to="/" className="h-[55px] w-[55px]">
            <img src={assets.Logo} alt="Leaf&Ink" />
          </Link>

          <div className="flex items-center gap-[5px] md:gap-[10px]">
            <Link
              to="/"
              className={`text-[14px] sm:text-[16px] md:text-[18px] font-[700] text-[#232323] px-[5px] sm:px-[15px] md:px-[20px] transition duration-300 ease-in-out  hover:text-[#ED553B]
              ${activeLink === "/" ? "text-[#ED553B]" : ""}`}
              onClick={() => handleLinkClick("/")}
            >
              Home
            </Link>

            <Link
              to="/books"
              className={`text-[14px] sm:text-[16px] md:text-[18px] font-[700] text-[#232323] px-[5px] sm:px-[15px] md:px-[20px] transition duration-300 ease-in-out hover:text-[#ED553B] 
              ${activeLink === "/books" ? "text-[#ED553B]" : ""}`}
              onClick={() => handleLinkClick("/books")}
            >
              All Books
            </Link>
            {isLoggedin && (
              <>
              <Link
                to="/cart"
                className={`text-[14px] sm:text-[16px] md:text-[18px] font-[700] text-[#232323] px-[5px] sm:px-[15px] md:px-[20px] transition duration-300 ease-in-out hover:text-[#ED553B] 
                ${activeLink === "/cart" ? "text-[#ED553B]" : ""}`}
                onClick={() => handleLinkClick("/cart")}
              >
                Cart
              </Link>

              <Link
              to="/profile"
              className={`text-[14px] sm:text-[16px] md:text-[18px] font-[700] text-[#232323] px-[5px] sm:px-[15px] md:px-[20px] transition duration-300 ease-in-out  hover:text-[#ED553B]
              ${activeLink === "/profile" ? "text-[#ED553B]" : ""}`}
              onClick={() => handleLinkClick("/profile")}
              >
              Profile
              </Link>
              
              </>
      
            )}

      

          {!isLoggedin ? (
              <Link
                to="/login"
                className={`text-[14px] sm:text-[16px] md:text-[18px] font-[700] text-[#232323] px-[5px] sm:px-[15px] md:px-[20px] transition duration-300 ease-in-out hover:text-[#ED553B]
            ${activeLink === "/login" ? "text-[#ED553B]" : ""}`}
                onClick={() => handleLinkClick("/login")}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => setIsLogoutModalVisible(true)}
                className="text-[14px] sm:text-[16px] md:text-[18px] font-[700] text-[#232323] px-[5px] sm:px-[15px] md:px-[20px] transition duration-300 ease-in-out hover:text-[#ED553B]"
              >
                Logout
              </button>

            )}
          </div>
        </div>
      </div>
      <Modal
      open={isLogoutModalVisible}
      title={
        <div className="text-[20px] font-bold text-[#393280] border-b pb-2">
          🔒 Confirm Logout
        </div>
      }
      onCancel={() => setIsLogoutModalVisible(false)}
      footer={null}
    >
      <p className="text-232323 text-[16px] mb-6">
        Are you sure you want to logout?
      </p>
      <div className="flex justify-end gap-3">
        <Button onClick={() => setIsLogoutModalVisible(false)} className="border border-primary rounded-[5px] text-primary bg-transparent min-w-[100px] transition-all duration-300 hover:!bg-primary hover:!text-white hover:!border-primary">
          No
        </Button>
        <Button onClick={handleLogout} className="border border-primary  bg-primary rounded-[5px] text-white min-w-[100px] transition-all duration-300 hover:!bg-transparent hover:!text-primary hover:!border-primary">
          Yes
        </Button>
      </div>
    </Modal>
    </>
   
  
  );
};

export default NavBar;
