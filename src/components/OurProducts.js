"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "@/utils/api";
import { motion } from "framer-motion";
import { togVariants, slideIn, slideInRight, buttonHover } from "@/utils/animation";

export default function OurProducts() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      setCategories(res.categoryList);
    });
  }, []);

  if (categories?.length === 0) {
    return <p className="text-center mt-10">No Categories Available</p>;
  }


  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;
  const getImageUrl = (image) => (image ? `${imageBaseUrl}${image}` : "/placeholder.jpg");


  return (
    <div className="block bg-white pb-8">
      {/* Title */}
      <div className="flex justify-center items-center bg-[#F4F3F0] h-10 sm:h-20 mt-8 w-44 sm:w-96">
        <motion.p
          className="text-lg sm:text-[27px] font-normal tracking-wider sm:tracking-[7.2px]"
          initial="offscreen"
          whileInView="onscreen"
          variants={slideIn}
        >
          Our Products
        </motion.p>
      </div>

      <div className="mt-6 flex flex-col md:flex-row w-full px-6 xs:px-10 sm:px-16 gap-5 md:gap-8">
        {/* Left Column */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col gap-8">
          <div>
            <motion.p
              className="text-xs sm:text-[17px] leading-6 sm:leading-8 tracking-wider capitalize break-words"
              initial="offscreen"
              whileInView="onscreen"
              variants={togVariants}
            >
              Dive into the exquisite realm of our meticulously crafted product categories, where each piece embodies the artistry of expert craftsmanship.
            </motion.p>
          </div>

          {categories?.slice(0, 2).map((category, index) => (
            <motion.div key={category._id} className="relative"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideIn}
            >
              <Link href={`/${category.slug}`}>
                {/* <Link href="/diningtable"> */}
                <Image
                  src={getImageUrl(category?.images[0])}
                  width={index === 0 ? 530 : 385}
                  height={index === 0 ? 326 : 300}
                  className={`${index === 0 ? "w-full lg:w-[530px]" : "md:ms-auto w-full lg:w-[400px] h-[210px] sm:h-[280px]"
                    }`}
                  alt={category.name}
                  priority // Ensures faster loading
                />
                <motion.button
                  className={`bg-white border border-[#766554] px-4 py-1 xl:py-1.5 absolute ${index === 0
                    ? "bottom-[-12px] md:bottom-[-20px] left-10"
                    : "bottom-[20px] left-0 md:left-0 lg:left-[80px] xl:left-[250px] 2xl:left-[380px]"
                    } tracking-widest text-[#766554]`}
                    whileHover="hover"
                    variants={buttonHover}
                >
                  <span className="text-xl">{category.name}</span>
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-5 lg:gap-16 xl:gap-0">
          {categories?.slice(2, 4).map((category, index) => (
            <motion.div key={category._id} className="relative"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideInRight}
            >
              <Link href={`/${category.slug}`}>
                {/* <Link href="/diningtable"> */}
                <Image
                  src={getImageUrl(category?.images[0])}
                  width={index === 0 ? 388 : 530}
                  height={300}
                  className={`${index === 0
                    ? "ms-auto w-full lg:w-[400px] h-[210px] sm:h-[280px]"
                    : "w-full md:mt-16"
                    }`}
                  alt={category.name}
                  priority
                />
                <motion.button
                  className={`text-xs md:text-base bg-white border border-[#766554] px-4 py-1 md:py-1.5 absolute ${index === 0
                    ? "bottom-[20px] left-0 sm:left-[80%] md:left-[-20px]"
                    : "bottom-[-20px] right-10 md:right-[20px]"
                    } tracking-widest text-[#766554]`}
                    whileHover="hover"
                    variants={buttonHover}
                >
                  <span className="text-xl">{category.name}</span>
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


// export default function OurProducts() {
//   return (
//     <div className="block bg-white pb-8">

//       {/* Title */}
//       <div className="flex justify-center items-center bg-[#F4F3F0] h-10 sm:h-20 mt-8 w-44 sm:w-96">
//         <p className="text-lg sm:text-[27px] font-normal tracking-wider sm:tracking-[7.2px]">Our Products</p>
//       </div>

//       <div className="mt-6 flex flex-col md:flex-row w-full px-6 xs:px-10 sm:px-16 gap-5 md:gap-8">
//           {/* Left Column */}
//           <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col gap-8">
//             <div>
//               <p className="text-xs sm:text-[17px] leading-6 sm:leading-8 tracking-wider capitalize break-words">Dive into the exquisite realm of our meticulously crafted product categories, where each piece embodies the artistry of expert craftsmanship. Here, the warm embrace of natural wood seamlessly merges with the sturdy grace of iron, creating furniture that transcends ordinary standards.
//               </p>
//             </div>
//             {/* Dining Table */}
//             <div className="text-center md:text-left mb-3 md:mb-5 relative">
//               <Link href="/diningtable">
//                 <Image src="/dining.png" width="530" height="326" className="w-full lg:w-[530px]" alt="Dining Table" />
//                 <button className="bg-white border border-[#766554] px-4 py-1 xl:py-1.5 md:text-base absolute bottom-[-12px] md:bottom-[-20px] left-10 tracking-widest text-[#766554]"><span className='text-xl'>Dining Table</span></button>
//               </Link>
//             </div>

//             {/* Stool */}
//             <div className="relative">
//               <Link href="/stool" className="text-end ">
//                 <Image src="/stool.png" width="385" height="300" className="md:ms-auto w-full lg:w-[400px] h-[210px] sm:h-[280px]" alt="Stool" />
//                 <button className="bg-white text-xs md:text-base border border-[#766554] px-4 py-1 xl:py-1.5 absolute bottom-[20px] left-0 md:left-0 lg:left-[80px] xl:left-[250px] 2xl:left-[380px] tracking-widest text-[#766554]"><span className='text-xl'>Stool</span></button>
//               </Link>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-5 lg:gap-16 xl:gap-0">
//             {/* Coffee Table */}
//             <div className="text-center relative">
//               <Link href="/coffeetable" className="">
//                 <Image src="/coffeetable.png" width="388" height="300" className="ms-auto w-full lg:w-[400px] h-[210px] sm:h-[280px]" alt="Coffee Table" />
//                 <button className="text-xs md:text-base bg-white border border-[#766554] px-4 py-1 md:py-1.5 absolute bottom-[20px] left-0 sm:left-[80%] md:left-[-20px] tracking-widest text-[#766554]"><span className='text-xl'>Coffee Table</span></button>
//               </Link>
//             </div>

//             {/* Metal Leg */}
//             <div className="relative md:mt-16">
//               <Link href="/metalleg">
//                 <Image src="/metalleg.png" width="530" height="300" className="w-full" alt="Metal Leg" />
//                 <button className="text-xs md:text-base bg-white border border-[#766554] px-4 py-2 md:py-1.5 absolute bottom-[-20px] right-10 md:right-[20px] tracking-widest text-[#766554]"><span className='text-xl'>Metal Leg</span></button>
//               </Link>
//             </div>
//           </div>
//         </div>
//     </div>
//   );
// }
