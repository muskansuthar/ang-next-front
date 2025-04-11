"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "@/utils/api";
import { motion } from "framer-motion";
import {
  togVariants,
  slideIn,
  slideInRight,
  buttonHover,
  slideUp,
} from "@/utils/animation";

export default function OurProducts() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      setCategories(res.categoryList);
    });
  }, []);

  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

  const getImageUrl = (image) => (image ? `${imageBaseUrl}${image}` : "/placeholder.jpg");



  return (
    <div className="block relative bg-white pb-8 2xl:container 2xl:mx-auto">
      {/* Title */}
      <div className="flex justify-center items-center bg-[#F4F3F0] h-10 sm:h-20 mt-4 md:mt-8 w-44 sm:w-96">
        <motion.p
          className="text-lg sm:text-[27px] font-normal tracking-wider sm:tracking-[7.2px]"
          initial="offscreen"
          whileInView="onscreen"
          variants={slideIn}
        >
          Our Products
        </motion.p>
      </div>

      <div className="w-full md:w-1/2 lg:w-4/5 md:ml-8 lg:ml-16 mt-0 md:mt-6 px-5 py-5 xs:px-14 sm:px-16 sm:py-8 md:px-0 md:py-0">
        <motion.p
          className="text-xs sm:text-[18px] leading-6 sm:leading-8 tracking-wider capitalize break-words"
          initial="offscreen"
          whileInView="onscreen"
          variants={togVariants}
        >
          dive into the exquisite realm of our meticulously crafted product categories, where each piece embodies the artistry of expert craftsmanship. here, the warm embrace of natural wood seamlessly merges with the sturdy grace of iron, creating furniture that transcends ordinary standards.
        </motion.p>
      </div>

      <div className="w-1/2 hidden md:block lg:hidden absolute right-0 top-0 lg:w-1/5 flex flex-col mt-5 md:mt-0 mb-5 md:mb-0 sm:px-4 md:px-0">
        {categories?.length > 2 && (
          <motion.div
            className="text-center relative mt-4 ml-20"
            initial="offscreen"
            whileInView="onscreen"
            variants={slideUp}
          >
            <Link href="/chair">
              <Image
                src={getImageUrl(categories[2]?.images[0])}
                width="530"
                height="326"
                className="w-[260px] h-[280px]"
                alt={categories[2].name}
              />
              <motion.button
                className="bg-white border border-[#766554] px-2 sm:py-1 md:text-base md:ml-[-32px] md:mt-[-30px] absolute tracking-widest text-[#766554] bottom-0"
                whileHover="hover"
                variants={buttonHover}
              >
                <span className="text-md sm:text-xl">{categories[2].name}</span>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>

      <div className="md:mt-10 flex flex-col md:flex-row w-full px-6 px-10 xs:px-14 sm:px-20 md:px-6">
        {/* Left Column */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-2 md:gap-8 items-start sm:px-4 xl:px-10">
          {categories?.length > 0 && (
            <motion.div
              className="w-full lg:w-auto text-center md:text-left mb-3 md:mb-5 relative"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideIn}
            >
              <Link href="/diningtable">
                <Image
                  src={getImageUrl(categories[0]?.images[0])}
                  width="530"
                  height="326"
                  className="w-full lg:w-[350px] h-[210px] sm:h-[300px]"
                  alt={categories[0].name}
                />
                <motion.button
                  className="bg-white border border-[#766554] px-1 sm:px-2 sm:py-1 md:text-base absolute bottom-[0px] lg:bottom-[-14px] xl:right-[-50px] tracking-widest text-[#766554]"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-md sm:text-xl">{categories[0].name}</span>
                </motion.button>
              </Link>
            </motion.div>
          )}

          {categories?.length > 1 && (
            <motion.div
              className="w-full lg:w-auto relative"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideIn}
            >
              <Link href="/stool" className="text-end">
                <Image
                  src={getImageUrl(categories[1]?.images[0])}
                  width="385"
                  height="300"
                  className="xl:ml-8 w-full lg:w-[400px] h-[210px] sm:h-[300px]"
                  alt={categories[1].name}
                />
                <motion.button
                  className="bg-white border border-[#766554] px-2 sm:px-4 sm:py-1 absolute bottom-0 lg:bottom-[20px] lg:right-[-50px] tracking-widest text-[#766554]"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-md sm:text-xl">{categories[1].name}</span>
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>

        <div className="w-full block md:hidden lg:block lg:w-1/5 flex flex-col mt-5 md:mt-0 mb-5 md:mb-0 sm:px-4 md:px-0">
          {categories?.length > 2 && (
            <motion.div
              className="text-center relative md:mt-20"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideUp}
            >
              <Link href="/chair">
                <Image
                  src={getImageUrl(categories[2]?.images[0])}
                  width="530"
                  height="326"
                  className="w-full h-[210px] sm:h-[300px]"
                  alt={categories[2].name}
                />
                <motion.button
                  className="bg-white border border-[#766554] px-2 sm:py-1 md:text-base md:ml-[-32px] mt-[-26px] sm:mt-[-38px] md:mt-[-30px] absolute tracking-widest text-[#766554]"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-md sm:text-xl">{categories[2].name}</span>
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>

        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-5 xl:gap-0 sm:px-4 xl:px-10 items-end">
          {categories?.length > 3 && (
            <motion.div
              className="w-full lg:w-auto text-center relative md:right-0"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideInRight}
            >
              <Link href="/coffeetable">
                <Image
                  src={getImageUrl(categories[3]?.images[0])}
                  width="388"
                  height="300"
                  className="w-full lg:w-[330px] h-[210px] sm:h-[300px]"
                  alt={categories[3].name}
                />
                <motion.button
                  className="bg-white border border-[#766554] px-2 sm:py-1 absolute bottom-[0px] lg:bottom-[-10px] left-0 lg:left-[-25px] tracking-widest text-[#766554]"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-md sm:text-xl">{categories[3].name}</span>
                </motion.button>
              </Link>
            </motion.div>
          )}

          {categories?.length > 4 && (
            <motion.div
              className="w-full lg:w-auto relative md:mt-8 lg:mt-14"
              initial="offscreen"
              whileInView="onscreen"
              variants={slideInRight}
            >
              <Link href="/diningtableleg">
                <Image
                  src={getImageUrl(categories[4]?.images[0])}
                  width="530"
                  height="300"
                  className="lg:mr-8 w-full lg:w-[400px] h-[210px] sm:h-[300px]"
                  alt={categories[4].name}
                />
                <motion.button
                  className="bg-white border border-[#766554] px-2 sm:px-4 sm:py-1.5 absolute bottom-[0px] lg:bottom-[20px] lg:left-[-50px] tracking-widest text-[#766554]"
                  whileHover="hover"
                  variants={buttonHover}
                >
                  <span className="text-md sm:text-xl">{categories[4].name}</span>
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}


// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { fetchDataFromApi } from "@/utils/api";
// import { motion } from "framer-motion";
// import {
//   togVariants,
//   slideIn,
//   slideInRight,
//   buttonHover,
//   slideUp,
// } from "@/utils/animation";

// export default function OurProducts() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchDataFromApi("/api/category").then((res) => {
//       setCategories(res.categoryList);
//     });
//   }, []);
//   return (
//     <div className="block relative bg-white pb-8">
//       {/* Title */}
//       <div className="flex justify-center items-center bg-[#F4F3F0] h-10 sm:h-20 mt-4 md:mt-8 w-44 sm:w-96">
//         <motion.p
//           className="text-lg sm:text-[27px] font-normal tracking-wider sm:tracking-[7.2px]"
//           initial="offscreen"
//           whileInView="onscreen"
//           variants={slideIn}
//         >
//           Our Products
//         </motion.p>
//       </div>

//       <div className="w-full md:w-1/2 lg:w-3/5 md:ml-8 lg:ml-16 mt-0 md:mt-6 px-5 py-5 sm:px-8 sm:py-8 md:px-0 md:py-0">
//         <motion.p
//           className="text-xs sm:text-[16px] leading-6 sm:leading-8 tracking-wider capitalize break-words"
//           initial="offscreen"
//           whileInView="onscreen"
//           variants={togVariants}
//         >
//           dive into the exquisite realm of our meticulously crafted product categories, where each piece embodies the artistry of expert craftsmanship. here, the warm embrace of natural wood seamlessly merges with the sturdy grace of iron, creating furniture that transcends ordinary standards.
//         </motion.p>
//       </div>

//       <div className="w-1/2 hidden md:block lg:hidden absolute right-0 top-0  lg:w-1/5 flex flex-col mt-5 md:mt-0 mb-5 md:mb-0 sm:px-4 md:px-0">

//           <motion.div
//             className="text-center relative mt-10 ml-16"
//             initial="offscreen"
//             whileInView="onscreen"
//             variants={slideUp}
//           >
//             <Link href="/stool">
//               <Image
//                 src="/dining.png"
//                 width="530"
//                 height="326"
//                 className="w-[300px] h-[280px]"
//                 alt="Chair"
//               />
//               <motion.button
//                 className="bg-white border border-[#766554] px-2 md:py-1 md:text-base md:ml-[-32px] md:mt-[-30px] absolute tracking-widest text-[#766554] bottom-0"
//                 whileHover="hover"
//                 variants={buttonHover}
//               >
//                 <span className="text-md md:text-xl">Chair</span>
//               </motion.button>
//             </Link>
//           </motion.div>

//         </div>

//       <div className="md:mt-10 lg:mt-6 flex flex-col md:flex-row w-full px-6 xs:px-10 sm:px-6">
//         {/* Left Column */}
//         <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-2 md:gap-8 items-start sm:px-4 xl:px-10">

//           <motion.div
//             className="w-full md:w-auto text-center md:text-left mb-3 md:mb-5 relative"
//             initial="offscreen"
//             whileInView="onscreen"
//             variants={slideIn}
//           >
//             <Link href="/diningtable">
//               <Image
//                 src="/dining.png"
//                 width="530"
//                 height="326"
//                 className="w-full lg:w-[350px] h-[210px] sm:h-[300px]"
//                 alt="Dining Table"
//               />
//               <motion.button
//                 className="bg-white border border-[#766554] px-1 md:px-2 md:py-1 md:text-base absolute bottom-[0px] lg:bottom-[-14px] xl:right-[-50px] tracking-widest text-[#766554]"
//                 whileHover="hover"
//                 variants={buttonHover}
//               >
//                 <span className="text-md md:text-xl">Dining Table</span>
//               </motion.button>
//             </Link>
//           </motion.div>

//           <motion.div
//             className="w-full md:w-auto relative"
//             initial="offscreen"
//             whileInView="onscreen"
//             variants={slideIn}
//           >
//             <Link href="/stool" className="text-end ">
//               <Image
//                 src="/stool.png"
//                 width="385"
//                 height="300"
//                 className="xl:ml-8 w-full lg:w-[400px] h-[210px] sm:h-[300px]"
//                 alt="Stool"
//               />
//               <motion.button
//                 className="bg-white border border-[#766554] px-2 md:px-4 md:py-1 absolute bottom-0 lg:bottom-[20px] lg:right-[-50px] tracking-widest text-[#766554]"
//                 whileHover="hover"
//                 variants={buttonHover}
//               >
//                 <span className="text-md md:text-xl">Stool</span>
//               </motion.button>
//             </Link>
//           </motion.div>
//         </div>

//         <div className="w-full block md:hidden lg:block lg:w-1/5 flex flex-col mt-5 md:mt-0 mb-5 md:mb-0 sm:px-4 md:px-0">

//           <motion.div
//             className="text-center relative md:mt-20"
//             initial="offscreen"
//             whileInView="onscreen"
//             variants={slideUp}
//           >
//             <Link href="/stool">
//               <Image
//                 src="/dining.png"
//                 width="530"
//                 height="326"
//                 className="w-full h-[210px] sm:h-[300px]"
//                 alt="Chair"
//               />
//               <motion.button
//                 className="bg-white border border-[#766554] px-2 md:py-1 md:text-base md:ml-[-32px] md:mt-[-30px] absolute tracking-widest text-[#766554] bottom-0"
//                 whileHover="hover"
//                 variants={buttonHover}
//               >
//                 <span className="text-md md:text-xl">Chair</span>
//               </motion.button>
//             </Link>
//           </motion.div>

//         </div>

//         <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-5 xl:gap-0 sm:px-4 xl:px-10 items-end">
//           {/* Coffee Table */}
//           <motion.div
//             className="w-full md:w-auto text-center relative md:right-0"
//             initial="offscreen"
//             whileInView="onscreen"
//             variants={slideInRight}
//           >
//             <Link href="/coffeetable" className="">
//               <Image
//                 src="/coffeetable.png"
//                 width="388"
//                 height="300"
//                 className="w-full lg:w-[330px] h-[210px] sm:h-[300px]"
//                 alt="Coffee Table"
//               />
//               <motion.button
//                 className="bg-white border border-[#766554] px-2 md:py-1 absolute bottom-[0px] lg:bottom-[-10px] left-0 lg:left-[-25px] tracking-widest text-[#766554]"
//                 whileHover="hover"
//                 variants={buttonHover}
//               >
//                 <span className="text-md md:text-xl">Coffee Table</span>
//               </motion.button>
//             </Link>
//           </motion.div>

//           {/* Metal Leg */}
//           <motion.div
//             className="w-full md:w-auto relative md:mt-8 lg:mt-14"
//             initial="offscreen"
//             whileInView="onscreen"
//             variants={slideInRight}
//           >
//             <Link href="/diningtableleg">
//               <Image
//                 src="/metalleg.png"
//                 width="530"
//                 height="300"
//                 className="lg:mr-8 w-full lg:w-[400px] h-[210px] sm:h-[300px]"
//                 alt="Metal Leg"
//               />
//               <motion.button
//                 className="bg-white border border-[#766554] px-2 md:px-4 md:py-1.5 absolute bottom-[0px] lg:bottom-[20px] lg:left-[-50px] tracking-widest text-[#766554]"
//                 whileHover="hover"
//                 variants={buttonHover}
//               >
//                 <span className="text-md md:text-xl">Dining Table Leg</span>
//               </motion.button>
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
