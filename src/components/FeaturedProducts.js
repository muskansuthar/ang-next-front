"use client"

import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { fetchDataFromApi } from "@/utils/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { togVariants, slideIn, titleVariants } from "@/utils/animation";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    fetchDataFromApi(`/api/products/featured`).then((res) => {
      setFeaturedProducts(res);
    });
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
  };

  if (featuredProducts.length === 0) {
    return
  }

  const prevIndex = currentIndex === 0 ? featuredProducts.length - 1 : currentIndex - 1;
  const nextIndex = (currentIndex + 1) % featuredProducts.length;


  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

  const getImageUrl = (image) => (image ? `${imageBaseUrl}${image}` : "/placeholder.jpg");

  return (
    <div className="block bg-[#F4F3F0] w-full overflow-x-hidden h-[100vh] sm:h-auto pb-9 sm:pb-20 xl:pb-28 2xl:container 2xl:mx-auto">
      {/* Title */}
      <div className="flex justify-center items-center bg-white h-10 sm:h-20 mt-8 w-52 sm:w-[480px]">
        <motion.p className="text-lg sm:text-[27px] font-normal tracking-wider sm:tracking-[7.2px]"
          initial="offscreen"
          whileInView="onscreen"
          variants={slideIn}
        >
          Featured Products
        </motion.p>
      </div>

      {/* Description */}
      <div className="mt-6 px-4 sm:px-8 lg:px-20 w-full md:w-[870px]">
        <motion.p
          className="text-xs sm:text-[18px] leading-6 sm:leading-8 tracking-wider capitalize break-words"
          initial="offscreen"
          whileInView="onscreen"
          variants={togVariants}
        >
          Welcome To Our Featured Products Section, Here We Proudly Present
          This Collection Of True Gems That Transcend Ordinary Expectations And
          Redefine The Very Essence Of Excellence.
        </motion.p>
      </div>

      <div>
        <div className="w-full relative">
          <div className="flex justify-between items-center pt-16 sm:pt-10 pb-5">
            {/* Left White Circle with Previous Image */}
            <div className="justify-center items-center rounded-full bg-white w-[26vw] md:w-[340px] h-[26vw] md:h-[340px] cursor-pointer -ml-[13.5%] hidden lg:flex">
              <Image
                src={getImageUrl(featuredProducts[prevIndex]?.images[0])}
                width={400}
                height={400}
                alt="Previous Image"
                className="max-w-none cursor-pointer hidden lg:block z-20 opacity-50"
              />
            </div>

            {/* Main Image with Arrows */}
            <div className="flex justify-between items-center mx-auto md:px-0">
              <BsArrowLeft
                className="relative left-3 text-4xl sm:text-5xl bg-[#dddbd6] text-[#766554] rounded-full p-2 opacity-70 cursor-pointer"
                onClick={prevImage}
              />

              <Link href={`/diningtable/${featuredProducts[currentIndex]?._id}`} passHref>
                <div className="relative flex justify-center items-center rounded-full bg-white w-[55vw] md:w-[500px] h-[55vw] md:h-[500px] cursor-pointer z-10">
                  <div className="absolute w-[90%] h-[90%] aspect-square">
                    <Image
                      src={getImageUrl(featuredProducts[currentIndex]?.images[0])}
                      fill
                      alt="Current Image"
                      className="object-contain cursor-pointer z-20"
                      sizes="(max-width: 768px) 55vw, 500px"
                    />
                  </div>
                </div>
              </Link>

              <BsArrowRight
                className="relative right-3 text-4xl sm:text-5xl bg-[#dddbd6] text-[#766554] rounded-full p-2 opacity-70 cursor-pointer"
                onClick={nextImage}
              />
            </div>

            {/* Right White Circle with Next Image */}
            <div className="justify-center items-center rounded-full bg-white w-[26vw] md:w-[340px] h-[26vw] md:h-[340px] cursor-pointer -mr-[13.5%] hidden lg:flex">
              <Image
                src={getImageUrl(featuredProducts[nextIndex]?.images[0])}
                width={400}
                height={400}
                alt="Next Image"
                className="max-w-none cursor-pointer hidden lg:block z-20 opacity-50"
              />
            </div>
          </div>

          <Link href={`/diningdetails/${featuredProducts[currentIndex]?._id}`} passHref>
            <motion.div className="w-full px-4 self-end flex justify-center mt-2"
              initial="offscreen"
              whileInView="onscreen"
              variants={titleVariants}
            >
              <p className="sm:tracking-[10px] text-[#766554] text-center text-sm xs:text-lg sm:text-2xl font-normal">
                {featuredProducts[currentIndex]?.name || "Product Name"}
              </p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
