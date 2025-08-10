import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContent } from "../../context/AppContext";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loadingRedirect, setLoadingRedirect] = useState(true);

  const navigate = useNavigate();
  const { backendUrl, isLoggedin, setIsLoggedin, userData, getUserData } =
    useContext(AppContent);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "api/auth/register", {
          username,
          email,
          password,
          address,
        });
        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("userEmail", email);
          navigate("/verify-email");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "api/auth/login", {
          email,
          password,
        });  

        if (data.success) {
          setIsLoggedin(true);
          toast.success(data.message);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userRole", data.role);
          localStorage.setItem("userEmail", email);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      const status = error.response?.status;
      const message =
        error.response?.data?.message || error.message || "Something went wrong";
  
      if (status === 403) {
       
        toast.info("Please verify your email before logging in. Check Your Email for Otp");
        navigate("/verify-email");
      } else {
        toast.error(message);
      }
    } 
  };


  useEffect(() => {
    if (isLoggedin) {
      if (userData?.isAccountVerified) {
        navigate("/"); // redirect verified users to home
      } else {
        navigate("/verify-email"); // redirect unverified users
      }
    } else {
      setLoadingRedirect(false); // show login form if not logged in
    }
  }, [isLoggedin, userData]);
  

  if (loadingRedirect) return null; 
  return (
    <div
    className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-0
      bg-gradient-to-br from-blue-200 to-purple-400"
  >
    <div className="bg-slate-900 p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-sm sm:w-96 text-indigo-300 text-sm">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-3">
        {state === "Sign Up" ? "Create Account" : "Login"}
      </h2>
      <p className="text-center text-xs sm:text-sm mb-4 sm:mb-6">
        {state === "Sign Up"
          ? "Create your Account"
          : "Login to your account!"}
      </p>
      <form onSubmit={handleSubmit}>
        {state === "Sign Up" && (
          <div className="mb-3 sm:mb-4 flex items-center gap-3 w-full px-4 py-2.5 rounded-full bg-[#333a5c]">
            <input
              type="text"
              onChange={(e) => setuserName(e.target.value)}
              value={username}
              className="bg-transparent outline-none w-full text-sm sm:text-base"
              placeholder="Full Name"
              required
            />
          </div>
        )}
  
        <div className="mb-3 sm:mb-4 flex items-center gap-3 w-full px-4 py-2.5 rounded-full bg-[#333a5c]">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-transparent outline-none w-full text-sm sm:text-base"
            placeholder="Email id"
            required
          />
        </div>
  
        <div className="mb-3 sm:mb-4 flex items-center gap-3 w-full px-4 py-2.5 rounded-full bg-[#333a5c]">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-transparent outline-none w-full text-sm sm:text-base"
            placeholder="Password"
            required
          />
        </div>
  
        {state === "Sign Up" && (
          <div className="mb-3 sm:mb-4 flex items-center gap-3 w-full px-4 py-2.5 rounded-lg bg-[#333a5c]">
            <textarea
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
              value={address}
              className="bg-transparent outline-none w-full text-sm sm:text-base resize-none"
            ></textarea>
          </div>
        )}
  
        <p
          onClick={() => navigate("/reset-password")}
          className="mb-4 text-indigo-400 cursor-pointer text-sm text-center"
        >
          Forget Password ?
        </p>
  
        <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
          {state}
        </button>
      </form>
  
      {state === "Sign Up" ? (
        <p className="text-gray-400 text-center text-xs mt-4">
          Already have an account?{" "}
          <span
            onClick={() => setState("Login")}
            className="underline cursor-pointer text-blue-400"
          >
            Login Here
          </span>
        </p>
      ) : (
        <p className="text-gray-400 text-center text-xs mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => setState("Sign Up")}
            className="underline cursor-pointer text-blue-400"
          >
            Sign up
          </span>
        </p>
      )}
    </div>
    </div>
  
  );
};

export default Login;
