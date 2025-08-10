import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../../../context/AppContext';

const Settings = () => {
  const { userData, backendUrl, getUserData } = useContext(AppContent);

  if (!userData) return null;

  // ✅ Update Address Handler
  const updateAddress = async (values, { setSubmitting }) => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    
    try {
      const { data } = await axios.put(
        backendUrl + "api/auth/update-address",
        { address: values.address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId
          }
        }
      );

      if (data.success) {
        toast.success("Address updated successfully");
        await getUserData();
      } else {
        toast.error(data.message || "Failed to update address");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Error updating address");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-0 pb-[92px] px-[20px]">
      <h1 className="font-[700] text-[32px] text-[#393280] mb-10">
        Your Profile
      </h1>

      <Formik
        initialValues={{
          username: userData.username || "",
          email: userData.email || "",
          address: userData.address || ""
        }}
        onSubmit={updateAddress}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-[100%] mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-200">

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="block text-[#393280] font-medium mb-1">Username</label>
                <Field
                  name="username"
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 text-gray-600"
                />
              </div>

              <div className="w-full">
                <label className="block text-[#393280] font-medium mb-1">Email</label>
                <Field
                  name="email"
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 text-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#393280] font-medium mb-1">Address</label>
              <Field
                as="textarea"
                name="address"
                rows={4}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#393280] resize-none"
              />
            </div>

            <div className="flex justify-center w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cmn-blue-btn text-white font-semibold py-2 px-6 rounded-md transition"
              >
                {isSubmitting ? "Updating..." : "Update Address"}
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Settings;
