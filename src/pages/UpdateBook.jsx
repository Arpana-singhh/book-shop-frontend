import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';

const UpdateBook = () => {
const [bookDetail, setBookDetail] = useState(null);
const { backendUrl } = useContext(AppContent);
const { id } = useParams();
const navigate = useNavigate();
let authToken = localStorage.getItem("authToken");
let userId = localStorage.getItem("userId");

const validationSchema = Yup.object({
    url: Yup.string().url('Invalid URL').required('Image URL is required'),
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    price: Yup.number().typeError('Must be a number').required('Price is required'),
    desc: Yup.string().required('Description is required'),
    language: Yup.string().required('Language is required'),
});

const getBookDetail = async () => {
    let result = await axios.get(backendUrl + `api/auth/book-detail/${id}`);
    result = result.data.data;
    setBookDetail(result);
    console.log(result)
};

useEffect(()=>{
    getBookDetail();
},[])

const updateBook = async(values)=>{
    let headers = {
        authorization: `Bearer ${authToken}`,
        id: userId,
        bookid: id,
      };
      try{
        const {data} = await axios.put(backendUrl + "api/auth/update-book",{
            url:values.url,
            title:values.title,
            author:values.author,
            price:values.price, 
            desc:values.desc,
            language:values.language
           },
           {headers} 
        )
        if(data.success){
            toast.success(data.message);
            navigate('/books')
        }
      }
      catch(error){
           toast.error(error.response?.data?.message || error.message || "Error updating book");
      }
 
}
  

  return (
      <div className="pt-0 pb-[92px] px-[20px]">
         <h1 className="text-[32px] font-bold text-[#393280] mb-6 text-center">
           Update Book Details
         </h1>
         {bookDetail && (
            <Formik
            enableReinitialize
            initialValues={{
            url: bookDetail.url || '',
            title: bookDetail.title || '',
            author: bookDetail.author || '',
            price: bookDetail.price || '',
            desc: bookDetail.desc || '',
            language: bookDetail.language || '',
            }}
            validationSchema={validationSchema}
            onSubmit={updateBook}
            >
            {() => (
            <Form className="bg-white rounded-xl shadow-md p-6 space-y-5 border border-gray-200 max-w-[850px] mx-auto">
                {/* Image URL */}
                <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <Field
                    type="text"
                    name="url"
                    placeholder="https://example.com/image.jpg"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393280]"
                />
                <ErrorMessage name="url" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Title and Author */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <Field
                    type="text"
                    name="title"
                    placeholder="Book Title"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393280]"
                    />
                    <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <Field
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393280]"
                    />
                    <ErrorMessage name="author" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                </div>

                {/* Price and Language */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <Field
                    type="number"
                    name="price"
                    placeholder="₹100"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393280]"
                    />
                    <ErrorMessage name="price" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Language</label>
                    <Field
                    type="text"
                    name="language"
                    placeholder="English / Hindi"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393280]"
                    />
                    <ErrorMessage name="language" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                </div>

                {/* Description */}
                <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <Field
                    as="textarea"
                    name="desc"
                    rows={4}
                    placeholder="Enter book description..."
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#393280]"
                />
                <ErrorMessage name="desc" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Submit */}
                <div className="flex justify-center">
                <button
                    type="submit"
                    className="cmn-blue-btn text-white font-semibold px-6 py-2 rounded-md  transition-all"
                >
                   Update Book
                </button>
                </div>
            </Form>
            )}
            </Formik>
         )}
        
       </div>
  )
}

export default UpdateBook
