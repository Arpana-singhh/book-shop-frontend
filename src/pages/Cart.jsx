import React, { useContext, useEffect, useState } from "react";
import { AppContent } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
 import Hurray from '../assets/images/hurray.png'
const Cart = () => {
  const [cartItems, setcartItems] = useState([]);
  const { backendUrl } = useContext(AppContent);
  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");

  const getCartBook = async () => {
    const headers = {
      authorization: `Bearer ${authToken}`,
      id: userId,
    };

    let { data } = await axios.get(backendUrl + "api/auth/get-cart-book", {
      headers,
    });
    if (data.success) {
      setcartItems(data.data);
      console.log(cartItems)
      
    }
  };


  const handleRemoveFromCart = async (bookId) => {
    const headers = {
      authorization: `Bearer ${authToken}`,
      id: userId,
      bookid: bookId,
    };

    try {
      const { data } = await axios.put(backendUrl + "api/auth/remove-book-from-cart", null, { headers });

      if (data.success) {
        toast.success(data.message);
        setcartItems(cartItems.filter((book) => book.book._id !== bookId));
       
      } else {
        console.log("Error removing from favourites");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  useEffect(()=>{
    getCartBook();
  },[])





      const updateQuantityBackend = async (bookId, newQty) => {
        const headers = {
          authorization: `Bearer ${authToken}`,
          id: userId,
          bookid: bookId,
        };
        try {
          await axios.put(backendUrl + "api/auth/update-cart-quantity", { quantity: newQty }, { headers });
        } catch (error) {
          console.error("Failed to update quantity:", error);
        }
      };
      
      const handleIncrement = (bookId) => {
        setcartItems(items => {
          const updated = items.map(item => {
            if (item.book._id === bookId) {
              const newQty = (item.quantity ?? 1) + 1;
              updateQuantityBackend(bookId, newQty);
              return { ...item, quantity: newQty };
            }
            return item;
          });
          return updated;
        });
      };
      
      
      const handleDecrement = (bookId) => {
        setcartItems(items => {
          const updated = items.map(item => {
            if (item.book._id === bookId) {
              const newQty = Math.max(1, (item.quantity ?? 1) - 1);
              updateQuantityBackend(bookId, newQty); 
              return { ...item, quantity: newQty };
            }
            return item;
          });
          return updated;
        });
      };
      
      
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.book.price * (item.quantity ?? 1),
      0
    );
    const discountPercent = subtotal >= 300 ? 10 : 5;
    const discountAmount = (subtotal * discountPercent) / 100;
    const productTax  = 15;
    const shipping    = 10; 
    const shippingTax = 5; 
    const total = subtotal - discountAmount + productTax + shipping + shippingTax

  return (
    <div className="mx-[60px] my-[40px]">
      <div className="flex  justify-between items-center">
        <h1 className="text-[40px] font-[600] text-[#393280] mb-[30px]">Shopping Cart</h1>
        
      </div>
      

      <div className="flex  gap-10">
        {/* Cart Items */}
        <div className="max-w-[870px] w-full flex flex-col gap-5">
          {cartItems.map((item) => (
            <div
              key={item.book._id}
              className="flex flex-col md:flex-row items-center border rounded-[12px] p-4 shadow-md"
            >
              <img
                src={item.book.url}
                alt={item.title}
                className="w-[120px] h-[160px] object-cover rounded-md mb-4 md:mb-0"
              />
              <div className="md:ml-6 flex flex-col flex-grow">
                <h2 className="text-[20px] font-[600] text-[#393280]">{item.book.title}</h2>
                <p className="text-[#555] text-[16px] mb-2">by {item.book.author}</p>
                <p className="text-[#393280] font-[500] text-[18px] mb-2">₹{item.book.price}</p>

                <div className="flex items-center space-x-4 mt-auto">
                  <div className="flex items-center border rounded-[6px] overflow-hidden">
                    <button onClick={() => handleDecrement(item.book._id)} className="px-3 py-1 bg-[#f2f2f2] hover:bg-[#ddd]"> – </button>
                    <span className="px-4">{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.book._id)}className="px-3 py-1 bg-[#f2f2f2] hover:bg-[#ddd]"> + </button>
                 </div>
                  <button className="cmn-blue-btn px-4 py-2 text-[14px] rounded-md" onClick={() => handleRemoveFromCart(item.book._id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Summary Section */}
        <div className="flex  flex-col gap-[20px] flex-grow">
          <div className="flex  justify-between items-center gap-[30px] border py-3 px-6 rounded-[12px] shadow-md">
            <p className="text-primary">Shop for ₹300+ and Enjoy 10% Off!</p>
            <img src={Hurray} alt="Hurray" width="40" height="40"/>
          </div>
          <div className="border p-6 rounded-[12px] shadow-md h-fit">
          
          <h2 className="text-[24px] font-[600] text-[#393280] mb-4">Order Summary</h2>
          <div className="flex justify-between mb-3">
            <span className="text-[16px]">Subtotal</span>
            <span className="font-[500]">{"\u20B9"}{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between mb-3">
            <p className="text-[16px]"> Discount <span className="text-sm text-gray-500">({discountPercent}%)</span>
            </p>
            <span>₹{discountAmount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between mb-3">
            <span className="text-[16px]">Tax</span>
            <span>₹{productTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-[16px]">Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-[16px]">Shipping Tax</span>
            <span>₹{shippingTax.toFixed(2)}</span>
          </div>
          <hr className="mb-4" />
          <div className="flex justify-between text-[18px] font-[600] text-[#393280] mb-4">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button className="w-full py-[12px] cmn-blue-btn text-[16px] font-[500] rounded-[8px] transition">
            Proceed to Checkout
          </button>
        </div>
        </div>
       
      </div>
    </div>
  );
};

export default Cart;
