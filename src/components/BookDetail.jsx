import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../../context/AppContext";
import { toast } from "react-toastify";
import ConfirmModal from "./Modal/ConfirmModal";
const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookDetail, setBookDetail] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { backendUrl, userRole } = useContext(AppContent);
  const [isFav, setIsFav] = useState(false);

  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");

  // Get Book Detail
  const getBookDetail = async () => {
    let result = await axios.get(backendUrl + `api/auth/book-detail/${id}`);
    result = result.data.data;
    setBookDetail(result);
  };

  // Add Book to Favourite or Remove Book from Favourite
  const handleFavourite = async () => {
    let headers = {
      authorization: `Bearer ${authToken}`,
      id: userId,
      bookid: id,
    };

    setIsFav((prev) => !prev);

    if (!isFav) {
      try {
        const { data } = await axios.put(
          backendUrl + "api/auth/add-book-to-favourite",
          null,
          { headers }
        );
        if (data.success) {
          toast.success(data.message);
          navigate('/profile/favourites')
        }
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Something went wrong";

        if (status === 409 && message === "Book is already in favourites") {
          toast.info("Already in favourites!");
          // navigate('/profile/favourites');
        } else {
          toast.error(message);
        }
      }
    } else {
      try {
        const { data } = await axios.put(
          backendUrl + "api/auth/remove-book-from-favourite",
          null,
          { headers }
        );
        if (data.success) {
          toast.success(data.message);
        }
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong";
        toast.error(message);
      }
    }
  };

  // Check Wheatre Book ALready is in favourite and manage state
  const checkIfFavourite = async () => {
   const headers = {
      authorization: `Bearer ${authToken}`,
      id: userId,
    };

    try {
      const { data } = await axios.get(
        `${backendUrl}api/auth/get-favourite-book-id`,
        { headers }
      );
      if (data.success && data.favourites.includes(id)) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    } catch (error) {
      console.error("Error checking favourite status", error);
    }
  };

  // Add Book to Cart
  const handleAddtoCart = async()=>{
    let headers = {
      authorization: `Bearer ${authToken}`,
      id: userId,
      bookid: id,
    };
    
    try{
      const { data } = await axios.put(  backendUrl + "api/auth/add-book-to-cart",  null,   { headers } );
      if (data.success) {
        toast.success(data.message);
        navigate('/cart')
      }
    } 
    catch(error){
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
 
    if (status === 409) {
      navigate('/cart')
    }
    }
  }

  useEffect(() => {
    getBookDetail();
    checkIfFavourite();
  }, [id]);

  const deleteBookModal =()=>{
    setIsDeleteModalVisible(true);
  }
  const handleBookDelete = async() => {
    let headers = {
      authorization: `Bearer ${authToken}`,
      id: userId,
      bookid: id,
    };
    try{
      const { data } = await axios.delete(backendUrl + "api/auth/delete-book", { headers });

      if (data.success) {
        toast.success(data.message);
        setIsDeleteModalVisible(false);
        navigate('/books')
      } else {
        console.log("Error in Deleting Book");
      }
      
     
    } 
    catch(error){
        const message = error.response?.data?.message || "Something went wrong";
        toast.error(message);   
    }
    
  };

  return (
    <>
        <div className=" bg-gray-50 py-12 px-6">
          {bookDetail && (
            <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden min-h-[500px] max-h-[500px]">
              {/* Book Image */}
              <div className="w-[30%]">
                <img
                  src={bookDetail.url}
                  alt={bookDetail.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Book Info */}
              <div className="w-[70%] p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-[40px] font-bold text-[#393280] mb-4">
                    {bookDetail.title}
                  </h2>

                  <h3 className="text-lg font-medium text-[#393280CC] mb-2">
                    {bookDetail.author}
                  </h3>

                  <p className="text-[18px] text-gray-700 mb-6 leading-relaxed">
                    {bookDetail.desc}
                  </p>

                  <div className="mb-4">
                    <span className="text-lg text-gray-600 font-medium">
                      Language:
                    </span>{" "}
                    <span className="text-[#393280] font-semibold">
                      {bookDetail.language}
                    </span>
                  </div>

                  <div className="text-[28px] font-bold text-[#393280] mb-6">
                    ₹{bookDetail.price}
                  </div>
                </div>

                {userRole == 'admin'?
                ( <div className="flex gap-2">
                  <Link to={`/update-book/${id}`} className="cmn-blue-btn py-[15px]">
                      Update Book
                    </Link>
                  <button onClick={deleteBookModal} className="text-[#393280] text-[20px] flex justify-center items-center h-[50px] w-[50px] border border-[#393280] rounded-full p-3 hover:bg-[#393280] hover:text-white transition-all duration-300">
                  <i className="fa-solid fa-trash"></i>
                    </button>
                  
                </div> ) 
                :
                ( <div className="flex gap-2">
                  <button className="cmn-blue-btn" onClick={handleAddtoCart}>
                    Add To Cart
                  </button>
                  <div>
                    <button
                      onClick={handleFavourite}
                      className="text-[#393280] text-[20px] flex justify-center items-center h-[50px] w-[50px] border border-[#393280] rounded-full p-3 hover:bg-[#393280] hover:text-white transition-all duration-300"
                    >
                      {!isFav ? (
                        <i className="fa-regular fa-heart"></i>
                      ) : (
                        <i className="fa-solid fa-heart"></i>
                      )}
                    </button>
                  </div>
                </div> )
                }

              
                
              </div>
            </div>
          )}
        </div>
        <ConfirmModal
          open={isDeleteModalVisible}
          onCancel={() => setIsDeleteModalVisible(false)}
          onConfirm={handleBookDelete}
          title="🗑️ Delete Book"
          message="Are you sure you want to permanently delete this book?"
          confirmText="Delete"
          cancelText="Cancel"
      />
    </>
  
  );
};

export default BookDetail;
