import React,{useContext} from 'react'
import { AppContent } from '../../context/AppContext';
import ProfileSidebar from '../components/ProfileSidebar';
import { Outlet } from 'react-router-dom';

const Profile = () => {
    const {userData} =
      useContext(AppContent);
  return (
    <div className=" bg-gray-100 py-10 px-4 flex ">
       <div className="w-[30%] min-h-[calc(100vh-60px-85px-24px-24px)]">
        <ProfileSidebar/>
      </div>
      <div className="flex-1 px-4 max-h-[calc(100vh-60px-85px-24px-24px)] overflow-auto">
        <Outlet/>
      </div>
    </div>
  )
}

export default Profile
