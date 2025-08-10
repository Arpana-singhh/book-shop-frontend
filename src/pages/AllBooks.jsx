import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import Loader from '../components/Loader/Loader';
const AllBooks = () => {
    const [bookData, setBookData] = useState('')
      const {backendUrl} = useContext(AppContent);

      const getAllBook =async()=>{
        let result= await axios.get(backendUrl + "api/auth/get-all-book")
        result = result.data.data
        setBookData(result);
      }
    
      useEffect(()=>{
        getAllBook();
      },[])
  
  return (
    <>
        <div className="pt-[0] pb-[92px] layout-fixer">
          <div className="mt-[40px] flex justify-center ">
            {!bookData && <Loader/>}
          </div>
          <div className="flex flex-wrap gap-[34px] mt-[40px]">
            {bookData && bookData.map((item, index) => (
              <Link to={`/book-detail/${item._id}`} key={index} className="w-[calc(100%/4-(3*34px)/4)] flex flex-col justify-center items-center shadow-[1.03px_4.12px_15px_0px_#8282822e] p-[20px] rounded-[10px] border border-transparent hover:border-[#393280] transition-all duration-300">
                <div className="w-[200px] h-[240px]">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover"/>
                </div>
                <div className="mt-2">
                  <h5 className="font-semibold text-[18px] text-[#393280] text-center">{item.title}</h5>
                  <p className="text-[14px] text-gray-600 text-center">{item.author}</p>
                  <p className="text-center">{item.price}</p>
                  <div className="flex justify-center items-center">
                    <button className="mt-2 px-4 py-2  text-[14px] cmn-org-btn  text-white rounded">Read More</button>
                  </div>
                 
                </div>
              </Link>
            ))}
          </div>
        </div>
    </>
  )
}

export default AllBooks