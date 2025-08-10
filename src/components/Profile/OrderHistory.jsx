import React, { useContext, useEffect, useState } from 'react'
import { AppContent } from '../../../context/AppContext';
import axios from 'axios';

const OrderHistory = () => {
  const [orderHistory, setorderHistory] = useState([]);
  const { backendUrl } = useContext(AppContent);
  let authToken = localStorage.getItem("authToken");
  let userId = localStorage.getItem("userId");

  const getOrderHistory = async () => {
    const headers = {
      authorization: `Bearer ${authToken}`,
      id: userId,
    };

    let { data } = await axios.get(backendUrl + "api/auth/get-order-history", {
      headers,
    });
    if (data.success) {
      setorderHistory(data.data);
      console.log(data.data)
    }
  };

  useEffect(()=>{
    getOrderHistory();
  },[])


  const getStatusClasses = (status) => {
  switch (status) {
    case 'Order Placed':
      return 'text-green-600';
    case 'Out for Delivery':
      return 'text-blue-600';
    case 'Delivered':
      return 'text-purple-600';
    case 'Canceled':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};
  return (
    <div className="pt-[0] pb-[92px] px-[20px]">
    <h1 className="font-[700] text-[32px] text-[#393280] mb-10">
       All History of Your Orders
    </h1>
    <div>
      <table className="w-full border bg-white shadow overflow-hidden rounded-[10px]">
        <thead>
          <tr className="border-b-[1px]">
            <th className="px-2  py-3 bg-primary text-white">Sr.No</th>
            <th className="px-2  py-3 bg-primary text-white">Name</th>
            <th className="px-2  py-3 bg-primary text-white">Quantity</th>
            <th className="px-2  py-3 bg-primary text-white">Price</th>
            <th className="px-2  py-3 bg-primary text-white">Status</th>
            <th className="px-2  py-3 bg-primary text-white">Mode</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory &&
           orderHistory.map((item, index)=>(
            <tr className="border-b-[1px]" key={index}>
            <td className="text-center p-2">{index+1}</td>
            <td className="text-center p-2">{item.book?.title || 'NA'}</td>
            <td className="text-center p-2">{item.quantity}</td>
            <td className="text-center p-2">{item.book?.price || 'NA'}</td>
            <td className={`font-semibold text-center p-2 ${getStatusClasses(item.status)}`}>{item.status}</td>
            <td className="text-center p-2">COD</td>
           </tr>
           ))}
        
           

        </tbody>
      </table>
    </div>
    </div>
  )
}

export default OrderHistory