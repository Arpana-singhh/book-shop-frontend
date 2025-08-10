import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { AppContent } from "../../../context/AppContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Favourites = () => {
  const [favBooks, setIsFavBooks] = useState("");
  const { backendUrl } = useContext(AppContent);
  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");

  const getFavouriteBook = async () => {
    const headers = {
      authorization: `Bearer ${authToken}`,
      id: userId,
    };

    let { data } = await axios.get(backendUrl + "api/auth/get-favourite-book", {
      headers,
    });
    if (data.success) {
      setIsFavBooks(data.data);
    }
  };

  const handleRemoveFromFavourite = async (bookId) => {
    const headers = {
      authorization: `Bearer ${authToken}`,
      id: userId,
      bookid: bookId,
    };

    try {
      const { data } = await axios.put(backendUrl + "api/auth/remove-book-from-favourite", null, { headers });

      if (data.success) {
        // Remove the book from the state after successful removal
        toast.success(data.message);
        setIsFavBooks(favBooks.filter((book) => book._id !== bookId));
       
      } else {
        // Handle error (optional)
        console.log("Error removing from favourites");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  useEffect(() => {
    getFavouriteBook();
  }, []);
  return (
    <>
      <div className="pt-[0] pb-[92px] px-[20px]">
        <h1 className="font-[700] text-[32px] text-[#393280] mb-10">
          Explore Your Favourites
        </h1>
        <div className="flex flex-wrap gap-[20px]">
          {favBooks &&
            favBooks.map((item, index) => (
              <div
                // to={`/book-detail/${item._id}`}
                key={index}
                className="w-[calc(100%/3-(2*20px)/3)] flex flex-col justify-center items-center shadow-[1.03px_4.12px_15px_0px_#8282822e] p-[20px] rounded-[10px] border border-transparent hover:border-[#393280] transition-all duration-300"
              >
                <div className="w-[200px] h-[240px]">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2">
                  <h5 className="font-semibold text-[18px] text-[#393280] text-center">
                    {item.title}
                  </h5>
                  <p className="text-[14px] text-gray-600 text-center">
                    {item.author}
                  </p>
                  <p className="text-center">{item.price}</p>
                  <div className="flex justify-center items-center">
                  <button
                      onClick={() => handleRemoveFromFavourite(item._id)}
                      className="mt-2 cmn-org-btn px-4 py-2  text-[14px] cmn-org-btn"
                    >
                      Remove from Favourite
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Favourites;
