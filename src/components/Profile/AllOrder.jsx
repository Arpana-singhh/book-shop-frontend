import React, { useContext, useEffect, useState } from 'react'
import { AppContent } from '../../../context/AppContext';
import axios from 'axios';
import { Modal, Button } from 'antd';
import 'antd/dist/reset.css'; // Ant Design v5
import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { toast } from 'react-toastify';


const AllOrder = () => {
    const [allOrder, setallOrder] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isBookModalVisible, setIsBookModalVisible] = useState(false);
    const { backendUrl } = useContext(AppContent);
    let authToken = localStorage.getItem("authToken");
    let userId = localStorage.getItem("userId");
  
    const getallOrder = async() => {
      const headers = {
        authorization: `Bearer ${authToken}`
      };
  
      let { data } = await axios.get(backendUrl + "api/auth/get-all-orders", {
        headers,
      });
      if (data.success) {
        setallOrder(data.data);
      }
    };
  
    useEffect(()=>{
      getallOrder();
    },[])

    const updateOrderStatus = async (orderId, newStatus) => {
   
      try {
        const { data } = await axios.post(
          `${backendUrl}api/auth/update-status/${orderId}`,
          { status: newStatus },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              id: userId, 
            },
          }
        );
    
        if (data.success) {
          toast.success(data.message);
          await getallOrder();
        }
      } catch (error) {
          const message = error.response?.data?.message || "Something went wrong";
          toast.error(message);
      }
    };
    

    const showUserModal = (order) => {
      setSelectedOrder(order);
      setIsUserModalVisible(true);
    };
  
    const showBookModal = (order) => {
      setSelectedOrder(order);
      setIsBookModalVisible(true);
    };

  return (
    <>
    <div className="pt-[0] pb-[92px] px-[20px]">
      <h1 className="font-[700] text-[32px] text-[#393280] mb-10">
        All Orders
      </h1>
      <div>
        <table className="w-full border bg-white shadow overflow-hidden rounded-[10px]">
          <thead>
            <tr className="border-b-[1px]">
              <th className="px-2  py-3 bg-primary text-white">Sr.No</th>
              <th className="px-2  py-3 bg-primary text-white">Book Info</th>
              <th className="px-2  py-3 bg-primary text-white">User Info</th>
              <th className="px-2  py-3 bg-primary text-white"><span>Status</span></th>
            </tr>
          </thead>
          <tbody>
            {allOrder?.map((item, index) => (
              <tr className="border-b" key={index}>
                <td className="text-center p-2">{index + 1}</td>

                <td className="text-center p-2">
                  <EyeOutlined
                    className="text-[#232323] text-[18px] cursor-pointer hover:text-primary"
                    onClick={() => showBookModal(item)}
                  />
                </td>

                <td className="text-center p-2">
                  <UserOutlined
                    className="text-[#232323] text-[18px] cursor-pointer hover:text-primary"
                    onClick={() => showUserModal(item)}
                  />
                </td>

                <td className="text-center p-2">
                  <Select
                    value={item.status}
                    className="w-[160px]"
                    onChange={(value) => updateOrderStatus(item._id, value)}
                  
                    options={[
                      { label: 'Order Placed', value: 'Order Placed' },
                      { label: 'Out for Delivery', value: 'Out for Delivery' },
                      { label: 'Delivered', value: 'Delivered' },
                      { label: 'Canceled', value: 'Canceled' },
                    ]}
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

     <Modal
        open={isBookModalVisible}
        title={
          <div className="text-[24px] font-bold text-primary border-b pb-2">
            📚 Book Information
          </div>
        }
        onCancel={() => setIsBookModalVisible(false)}
        footer={null} 
      >
        {selectedOrder?.book ? (
          <div className="space-1">
            <p className="text-[18px] font-bold">Title: <span className="text-[16px] font-normal">{selectedOrder.book.title}</span></p>
            <p className="text-[18px] font-bold">Description:<span className="text-[16px] font-normal">{selectedOrder.book.desc}</span></p>
            <p className="text-[18px] font-bold">Author: <span className="text-[16px] font-normal">{selectedOrder.book.author}</span></p>
            <p className="text-[18px] font-bold">Price: <span className="text-[16px] font-normal">₹{selectedOrder.book.price}</span></p>
            <p className="text-[18px] font-bold">Language: <span className="text-[16px] font-normal">₹{selectedOrder.book.language}</span></p>
            <p className="text-[18px] font-bold">Quantity: <span className="text-[16px] font-normal">{selectedOrder.quantity}</span></p>
          </div>
        ) : (
          <p>No book data available.</p>
        )}
      </Modal>

        {/* User Info Modal */}
        <Modal
        open={isUserModalVisible}
        title={
          <div className="text-[24px] font-bold text-primary border-b pb-2">
            👤 User Information
          </div>
          }
        onCancel={() => setIsUserModalVisible(false)}
        footer={null} 
      >
        {selectedOrder?.user ? (
          <div className="space-1">
          <p className="text-[18px] font-bold">
            Username: <span className="text-[16px] font-normal">{selectedOrder.user.username}</span>
          </p>
          <p className="text-[18px] font-bold">
            Email: <span className="text-[16px] font-normal">{selectedOrder.user.email}</span>
          </p>
          <p className="text-[18px] font-bold">
            Address: <span className="text-[16px] font-normal">{selectedOrder.user.address}</span>
          </p>

          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </Modal>

    </>

  )
}

export default AllOrder