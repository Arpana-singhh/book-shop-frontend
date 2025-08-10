import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const getAuthState = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setIsLoggedin(false);
      setLoadingUser(false);
      return;
    }

    try {
      const { data } = await axios.get(backendUrl + "api/auth/is-auth", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
      localStorage.clear(); // 👈 Optional: clear bad token
      setIsLoggedin(false);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const getUserData = async () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) return;

    try {
      const { data } = await axios.get(backendUrl + "api/auth/get-user", {
        headers: { Authorization: `Bearer ${token}`, id: userId },
      });

      if (data.success) {
        setUserData(data.user);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        toast.error("Token expired. Please log in again");
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const value = {
    backendUrl,
    getUserData,
    userData,
    setUserData,
    isLoggedin,
    setIsLoggedin,
    loadingUser,
    userRole: userData?.role || null
  };
  return (
    <>
      <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
    </>
  );
};
