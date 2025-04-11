"use client"

// components/Homepage.js

import React, { useContext, useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";
import { MdClose, MdMenu } from 'react-icons/md'
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { titleVariants, buttonHover, yearVariants, letterVariants, textContainerVariants } from "@/utils/animation";
import { fetchDataFromApi } from '@/utils/api';
import { MyContext } from "@/context/ThemeContext";

export default function Homepage() {

  const [showSearch, setShowSearch] = useState(false);
  const [toggleIcon, setToggleIcon] = useState(false);
  const [homepageimage, setHomepageimage] = useState([])
  const [mobileimage, setMobileimage] = useState([])
  
  const [searchFields, setSearchFields] = useState("")

  const router = useRouter();

  
  const context = useContext(MyContext);

  const onChangeValue = (e) => {
    setSearchFields(e.target.value)
}

useEffect(() => {
  window.scrollTo(0, 0)

  fetchDataFromApi('/api/homepageimg').then(res => {
      setHomepageimage(res?.data)
  })
  fetchDataFromApi('/api/mobileimg').then(res => {
      setMobileimage(res?.data)
  })
}, [])

const searchProducts = (event) => {
  event.preventDefault();
  fetchDataFromApi(`/api/search/filter?q=${searchFields}`).then((res) => {
    context.setSearchData(res)
    router.push("/search")
  })
}

  const navigateToProducts = () => {
    router.push('/ourproducts');
  };

  const navigateToFeaturedProducts = () => {
    router.push('/featuredproducts');
  };

  const text = "Defining Perfection Since";

  
  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

  const getImageUrl = (image) => (image ? `${imageBaseUrl}${image}` : "/placeholder.jpg");

  return (
    <div className="flex">

      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col justify-center bg-white w-[40px] lg:w-[70px] h-[924px]">
        <ul className=" flex justify-center list-disc transform -rotate-90 text-center space-x-20 text-[#766554] text-lg lg:text-xl font-semibold">
          <li>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </li>
        </ul>
      </div>


      <div className="flex-grow flex-col md:flex-row bg-cover md:bg-center h-[807px] md:h-[924px]"
      style={{
        backgroundImage: homepageimage?.length > 0 && homepageimage[0].images.length > 0
        ? `url(${getImageUrl(homepageimage[0].images[0])})`
        : "none",
      }}
      >

        {/* Main Container */}

        <div className="flex-1 px-0">

          {/* Navbar for Mobile */}
          <div className="md:hidden bg-[#F4F3F0] h-[120px] flex items-center justify-between px-4">
            <img className="h-[90px] w-[96px]" src="/logo.png" alt="Logo" />
            <div className="flex flex-col mt-5 w-64 xxs:ml-2 ml-0 xs:w-72 sm:w-96">
              <div className="flex flex-col items-center py-2 rounded bg-white border border-[#766554]">
                <ul className=" w-full flex justify-around text-[#766554] text-xs font-semibold list-disc">
                  <li>
                    <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
              <div className=" flex items-center justify-end relative mt-2 w-full">
                <form className='flex w-full px-4 text-[12px] border border-[#766554] bg-white rounded' role="search" onSubmit={searchProducts}>
                  <input
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    className="focus:outline-none orm-input w-full p-0.5"
                    onChange={onChangeValue}
                  />
                  <button className="text-sm text-[#766554]"
                    type="submit" ><IoMdSearch /></button>
                </form>
                <div className="flex items-center text-2xl pl-2 rounded-full md:hidden cursor-pointer" onClick={() => setToggleIcon(!toggleIcon)}>
                  {toggleIcon ? <MdClose className='text-[#766554]' /> : <MdMenu className='text-[#766554]' />}
                </div>
              </div>
            </div>
          </div>

          {/* Right-side Menu for Mobile */}
          {toggleIcon && (
            <div className="md:hidden absolute top-28 right-0 w-36 h-auto bg-white shadow-lg z-50 transition-transform transform translate-x-0">
              <ul className="flex flex-col items-center p-2 space-y-4 text-[#766554] text-sm font-semibold">
                <li><Link href="#" onClick={() => setToggleIcon(false)}>Home</Link></li>
                <li><Link href="/featuredproducts" onClick={() => setToggleIcon(false)}>Featured Products</Link></li>
                <li><Link href="/ourproducts" onClick={() => setToggleIcon(false)}>Our Products</Link></li>
                <li><Link href="#about-us" onClick={() => setToggleIcon(false)}>About Us</Link></li>
                <li><Link href="#contact-us" onClick={() => setToggleIcon(false)}>Contact Us</Link></li>
              </ul>
            </div>
          )}

          {/* Navbar for Desktop */}
          <div className="hidden md:flex items-center justify-between mt-[15px] px-4">
            <div className="flex items-center justify-center bg-white w-[100px] md:w-[130px] lg:w-[175px] h-[85px] md:h-[135px] lg:h-[170px] -mx-12 lg:-mx-16 self-start">
              <Image src="/logo.png" width={157} height={146} alt="Logo" className="hidden lg:block" />
              <Image src="/logo.png" width={122} height={121} alt="Logo" className=" hidden md:block lg:hidden" />
              <Image src="/logo.png" width={82} height={81} alt="Logo" className=" block md:hidden" />
            </div>


            <nav className="flex flex-col items-center justify-center rounded-md bg-white h-auto w-[500px] md:w-[550px] lg:w-[650px] xl:w-[850px] text-gray-600 lg:mr-12 lg:mb-8">
              <ul className="flex items-center justify-center space-x-7 xl:space-x-11 py-3 lg:py-6 h-full md:h-auto rounded-lg text-[10px] md:text-xs lg:text-sm xl:text-lg uppercase font-normal text-gray-600">
                <li><Link href="#" className="hover:font-semibold hover:text-black">Home</Link></li>
                <li><Link href="#featured-products" className="hover:font-semibold hover:text-black">Featured Products</Link></li>
                <li><Link href="#our-products" className="hover:font-semibold hover:text-black">Products</Link></li>
                <li><Link href="#about-us" className="hover:font-semibold hover:text-black">About Us</Link></li>
                <li><Link href="#contact-us" className="hover:font-semibold hover:text-black">Contact Us</Link></li>
                <li className="nav-item rounded-full cursor-pointer lg:ml-4 hidden sm:block" onClick={() => setShowSearch(!showSearch)} >
                  {showSearch ? (<MdClose className="text-2xl" />) : (<IoMdSearch className="text-2xl" />)}</li>
              </ul>

              {showSearch && (
                <form className="flex mt-2 pt-1 pb-3 mb-2 px-5 lg:px-9 bg-white lg:mt-0 w-full" role="search" onSubmit={searchProducts}>
                  <input className="form-input w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d8af88]"
                    type="search" placeholder="Search" aria-label="Search" onChange={onChangeValue}/>
                  <button className="ml-2 btn bg-[#948473] text-white px-4 py-2 rounded-md text-sm hover:bg-[#493d32]"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              )}
            </nav>
          </div>

          <div className="hidden mt-[350px] md:mt-72 lg:mt-64 md:flex justify-center items-center font-normal">
            {/* Desktop Content */}
            <div className="hidden sm:flex">
              {/* Animate Each Letter in Text */}
              <motion.div
                className="text-black text-3xl md:text-4xl lg:text-[40px] tracking-widest sm:items-center lg:flex-row lg:items-start"
                initial="offscreen"
                whileInView="onscreen"
                variants={textContainerVariants}
              >
                {text.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    variants={letterVariants}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>
              <motion.span
                className="relative bottom-[5px] md:bottom-[9px] lg:bottom-5"
                initial="offscreen"
                whileInView="onscreen"
                variants={yearVariants}
              >
                <span className="pl-2 lg:pl-4 text-3xl md:text-4xl lg:text-[50px] font-semibold tracking-widest">200</span>
                <span className="relative bottom-[-5px] md:bottom-[-8px] lg:bottom-[-6.5px] text-4xl md:text-5xl lg:text-[60px] font-semibold">5...</span>
              </motion.span>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="bg-cover filter brightness-110 h-[686px] md:hidden"
          style={{
            backgroundImage: mobileimage?.length > 0 && mobileimage[0].images.length > 0
            ? `url(${getImageUrl(mobileimage[0].images[0])})`
            : "none",
          }}
          >
            <div className="flex flex-col items-center pt-56">
              <div className=" ml-32">
                <motion.p 
                className="text-black text-xl tracking-widest font-normal leading-tight"
                initial="offscreen"
                  whileInView="onscreen"
                  variants={titleVariants}
                >
                  Defining Perfection Since
                </motion.p>
                <motion.p
                  className=" tracking-widest leading-tight"
                  initial="offscreen"
                  whileInView="onscreen"
                  variants={yearVariants}
                >
                  <span className="text-xl font-semibold">200</span>
                  <span className="text-[24px] font-semibold relative top-[3px] ">5<span className="font-thin">...</span></span>
                </motion.p>
              </div>
              <motion.button
                onClick={navigateToProducts}
                className="mt-12 h-10 w-40 border border-[#766554] rounded-full text-[#766554] font-normal text-[23px]"
                whileHover="hover"
                variants={buttonHover}
              >
                PRODUCTS
              </motion.button>
            </div>
            <SlArrowRight className=" absolute w-10 h-10 right-2 mt-14 text-white" onClick={navigateToFeaturedProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
