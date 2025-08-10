import React from 'react'


const TopBar = () => {
  return (
    <div className="bg-[#393280] w-full layout-fixer py-[18px] text-white">
      <div className="flex justify-center sm:justify-between items-center flex-col sm:flex-row gap-[10px]  sm:gap-0">
        <div>
      
          <a href="tel:+918374902234" className="flex items-center gap-[5px] sm:text-[16px] text-[14px]">
            <i className="fa-solid fa-phone"></i>
            +91 8374902234
          </a>
        </div>

        <div className="flex items-center gap-[15px]">
        
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-transparent border border-white w-[30px] h-[30px] flex justify-center items-center rounded-full text-white transition-all duration-300 hover:bg-white hover:text-primary"
        >
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-transparent border border-white w-[30px] h-[30px] flex justify-center items-center rounded-full text-white transition-all duration-300 hover:bg-white hover:text-primary"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-transparent border border-white w-[30px] h-[30px] flex justify-center items-center rounded-full text-white transition-all duration-300 hover:bg-white hover:text-primary"
        >
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-transparent border border-white w-[30px] h-[30px] flex justify-center items-center rounded-full text-white transition-all duration-300 hover:bg-white hover:text-primary"
        >
          <i className="fa-brands fa-x-twitter"></i>
        </a>
        </div>
      </div>
    </div>
  )
}

export default TopBar
