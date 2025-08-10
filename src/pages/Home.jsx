import React from "react";
import Slider from "react-slick";

import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import Category from "../components/Category";
import NewRelease from "../components/NewRelease";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <>
      {/* Hero Section */}
      <div className="layout-fixer w-full pt-[60px] pb-[120px] lg:py-8 bg-custom-gradient overflow-hidden">
        <div>
          <Slider {...settings} className="hero-slider">
            {/* Slide 1 */}
            <div className="relative">
              <div className="min-h-[575px} sm:min-h-[657px] flex flex-col-reverse lg:flex-row items-center gap-[10px] sm:gap-[30px]">
                <div className="flex flex-col z-10">
                  <h1 className="mb-[9px] text-[28px] md:text-[36px] lg:text-[42px] font-[600] text-[#393280] text-center lg:text-left">
                    Lipsum Dolor Si
                  </h1>
                  <p className="mb-[28px] max-w-[607px] font-[500] text-[14px] sm:text-[16px] md:text-[18px] leading-[28px] text-[#393280CC] text-center lg:text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet,
                    libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend.
                    Amet, quis urna, a eu.
                  </p>
                  <Link
                    to="/"
                    className="text-[#393280] font-[400] text-[14px] sm:text-[16px] px-[34px] sm:pt-[12px] sm:pb-[14px] py-[10px] border border-[#393280] rounded-[7px] w-fit hover:bg-[#393280] hover:text-white mx-auto lg:mx-0 transition-all duration-300"
                  >
                    <span className="mr-[10px]">READ MORE</span>
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </Link>
                </div>
                <div className="relative w-full md:w-auto mb-6 md:mb-0">
                  <img
                    src={assets.heroSlider1}
                    alt="Slide 1"
                    className="w-full max-w-none h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="relative">
              <div className="min-h-[575px} sm:min-h-[657px] flex flex-col-reverse lg:flex-row items-center gap-[10px] sm:gap-[30px]">
                <div className="flex flex-col z-10">
                  <h1 className="mb-[9px] text-[28px] md:text-[36px] lg:text-[42px] font-[600] text-[#393280] text-center lg:text-left">
                    Lipsum Dolor Si
                  </h1>
                  <p className="mb-[28px] max-w-[607px] font-[500] text-[14px] sm:text-[16px] md:text-[18px] leading-[28px] text-[#393280CC] text-center lg:text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet,
                    libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend.
                    Amet, quis urna, a eu.
                  </p>
                  <Link
                    to="/"
                    className="text-[#393280] font-[400] text-[14px] sm:text-[16px] px-[34px] sm:pt-[12px] sm:pb-[14px] py-[10px] border border-[#393280] rounded-[7px] w-fit hover:bg-[#393280] hover:text-white mx-auto lg:mx-0 transition-all duration-300"
                  >
                    <span className="mr-[10px]">READ MORE</span>
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </Link>
                </div>
                <div className="relative w-full md:w-auto mb-6 md:mb-0">
                  <img
                    src={assets.heroSlider2}
                    alt="Slide 2"
                    className="w-full max-w-[400px] md:max-w-none h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>


      {/* Category Section */}
      <Category />
      <NewRelease />
    </>
  );
};

export default Home;
