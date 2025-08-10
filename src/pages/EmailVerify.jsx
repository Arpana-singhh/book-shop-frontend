import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContent } from "../../context/AppContext";
const EmailVerify = () => {
  const inputRefs = React.useRef([]);
  const navigate = useNavigate();
  const { backendUrl, userData } = useContext(AppContent);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const email = localStorage.getItem("userEmail"); // 🔥 Get email from localStorage

      const { data } = await axios.post(backendUrl + "api/auth/verify-email", {
        email, // include email
        otp,
      });

      if (data.success) {
        toast.success(data.message);

        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };



  return (
    <>
     <div
        className="flex items-center justify-center min-h-screen px-4 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400"
      >
        <form
          className="bg-slate-900 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm text-sm"
          onSubmit={onSubmitHandler}
        >
          <h1 className="text-white text-xl sm:text-2xl font-semibold text-center mb-4">
            Email Verify OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300 text-sm sm:text-base">
            Enter the 6-digit code sent tp your email id
          </p>
          <div
            className="flex justify-between mb-8 gap-2 sm:gap-0"
            onPaste={handlePaste}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-[#333a5c] text-white text-center text-xl rounded-md"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white">
            {" "}
            Verify email
          </button>
        </form>
      </div>

    </>
  );
};

export default EmailVerify;
