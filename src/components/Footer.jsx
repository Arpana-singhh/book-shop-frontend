import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
const Footer = () => {

  return (
    <>


    <div className="bg-[linear-gradient(90deg,_rgba(255,230,230,0.52)_0%,_rgba(245,255,254,0.52)_13.33%,_rgba(252,243,255,0.52)_54.58%,_rgba(255,244,230,0.52)_99.86%)] py-[106px]">
        <div className="flex justify-between layout-fixer">
            <div>
                <div>
                    <img src={assets.Logo} alt=""/>
                </div>
                <p className="text-[18px] text-[#011627] font-[400] max-w-[368px] mt-3">Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div>
                <h4 className="font-[600] text-[24px] text-[#ED553B] mb-[39px]">COMPANY</h4>
                <ul className="flex flex-col gap-[10px]">
                    <li>
                        <Link to="/" title="HOME" className="font-[400] text-[18px] text-[#263238] hover:text-[#ED553B] transition duration-300 ease-in-out">HOME</Link>
                    </li>
                    <li>
                        <Link to="/about" title="ABOUT" className="font-[400] text-[18px] text-[#263238] hover:text-[#ED553B] transition duration-300 ease-in-out">ABOUT</Link>
                    </li>
                    <li>
                        <Link to="/books" title="ALL BOOKS" className="font-[400] text-[18px] text-[#263238] hover:text-[#ED553B] transition duration-300 ease-in-out">ALL BOOKS</Link>
                    </li>
                    <li>
                        <Link to="/cart" title="CART" className="font-[400] text-[18px] text-[#263238] hover:text-[#ED553B] transition duration-300 ease-in-out">CART</Link>
                    </li>
                
                </ul>
            </div>
            <div className="flex flex-col">
                <h4 className="font-[600] text-[24px] text-[#ED553B] mb-[39px]">INFORMATION</h4>
                <div className="flex flex-col gap-[10px]">
                    <a href="mailto:dummyemail@gmail.com" className="leading-[30px] flex items-center gap-[8px] font-[400] text-[18px] text-[#263238] hover:text-[#ED553B] transition duration-300 ease-in-out">
                        <i className="fa-solid fa-envelope"></i>
                        <span className="mt-[-3px]">dummyemail@gmail.com</span>
                    </a>
                    <a href="tel:+1234567890" className="leading-[30px] flex items-center gap-[8px] font-[400] text-[18px] text-[#263238] hover:text-[#ED553B] transition duration-300 ease-in-out">
                        <i className="fa-solid fa-phone"></i>
                        <span>+123 456 7890</span>
                    </a>
                    <a href="https://www.google.co.in/maps" className="leading-[30px] flex items-center gap-[8px] font-[400] text-[18px] text-[#263238] hover:text-[#ED553B] transition duration-300 ease-in-out">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>1234 Elm Street, Suite 567, Downtown City, State 12345</span>
                    </a>
                </div>
            </div>
            <div className="flex gap-[30px]">
                <a href="/" target="_blank">
                    <img src={assets.Facebook} />
                </a>
                <a href="/" target="_blank">
                    <img src={assets.Linkend} />
                </a>
                <a href="/" target="_blank">
                    <img src={assets.Twitter}/>
                </a>
                <a href="/" target="_blank">
                    <img src={assets.Youtube}/>
                </a>
            </div>
        </div>
        <div className="layout-fixer mt-[60px] flex justify-between text-[#011627]">
            <p>© 2025 Arihant. All Rights Reserved.</p>
            <div className="flex gap-[15px] items-center">
                <span className="text-[#011627] hover:text-[#ED553B] transition duration-300 ease-in-out">Privacy</span>
                <span className="h-[20px] block w-[1px] bg-[#011627] "></span>
                <span className="text-[#011627] hover:text-[#ED553B] transition duration-300 ease-in-out">Terms of Service</span>
            </div>
        </div>
    </div>


    </>
  )
}

export default Footer