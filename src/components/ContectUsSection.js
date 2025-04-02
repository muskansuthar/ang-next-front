"use client";

import { motion } from "framer-motion";
import { desVariants, titleVariants, togVariants, slideIn, buttonHover } from "@/utils/animation";

export default function ContactUsSection() {
  return (
    <footer className="bg-[#F4F3F0] sm:bg-white" id="foot">
      {/* Header */}
      <div
        className="flex justify-center items-center bg-white sm:bg-[#F4F3F0] sm:py-4 h-8 sm:h-[80px] sm:px-8 sm:mt-5 w-28 sm:w-96">
        <motion.p
          className="text-sm sm:text-[27px] font-normal tracking-wider sm:tracking-[7.2px]"
          initial="offscreen"
          whileInView="onscreen"
          variants={slideIn}
        >Contact Us</motion.p>
      </div>

      {/* Address & Email Details */}
      <div className="flex justify-center flex-wrap mt-4 sm:mt-8">
        {/* Address Section */}
        <motion.div
          className="flex flex-col w-5/12 md:w-5/12"
          initial="offscreen"
          whileInView="onscreen"
          variants={titleVariants}
        >
          <div className="flex items-start mb-4 md:mb-8">
            <img className="hidden md:flex w-8 lg:w-12 mr-4" src="/location.png" alt="Location Icon" />
            <div className="flex-1">
              <div className="text-[#786756] text-xs sm:text-xl lg:text-2xl font-semibold">Address</div>
              <div className="text-[#675038] text-[9px] sm:text-sm lg:text-lg mt-1">
                E-97 Industrial Area Mandore, Jodhpur 342304, Rajasthan, India
              </div>
            </div>
          </div>
          <div className="flex items-start md:ml-11 lg:ml-16">
            <div className="flex-1">
              <div className="text-[#786756] text-xs sm:text-xl lg:text-2xl font-semibold">Branch Address</div>
              <div className="text-[#675038] text-[9px] sm:text-sm lg:text-lg mt-1">
                F-204-205 Industrial Area Mandore, Jodhpur 342304, Rajasthan, India
              </div>
            </div>
          </div>
        </motion.div>

        {/* Email Section */}
        <motion.div
          className="flex flex-col w-5/12 md:w-5/12 pl-12 xs:pl-20 lg:pl-28"
          initial="offscreen"
          whileInView="onscreen"
          variants={togVariants}
        >
          <div className="flex items-start mb-8">
            <img className="hidden md:flex w-16 lg:w-20 pt-1 mr-4" src="/email.png" alt="Email Icon" />
            <div className="flex-1 pl-2">
              <div className="text-[#786756] text-xs sm:text-xl lg:text-2xl font-semibold">Email address</div>
              <ul className="mt-1 text-[#786756] text-[9px] sm:text-sm lg:text-lg md:list-disc sm:pl-5 lg:pl-8">
                <li>info@angiraartexports.com</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subscribe Section */}
      <motion.div
        className="flex justify-end relative bottom-5 sm:bottom-0 lg:mt-8 mr-0.5 xs:mr-3 sm:mr-5 lg:mr-14"
        initial="offscreen"
        whileInView="onscreen"
        variants={desVariants}
      >
        <motion.button
          className="py-0.5 sm:py-1 lg:py-2 px-1.5 sm:px-4 lg:px-8 border rounded-full border-[#786756] bg-white text-[#786756] text-[8px] sm:text-sm lg:text-lg"
          whileHover="hover"
          variants={buttonHover}
        >
          Subscribe to newsletter for newest designs
        </motion.button>
      </motion.div>

      <br />
    </footer>
  );
}


// export default function ContactUsSection () {
//   return (
//     <footer className="bg-[#F4F3F0] sm:bg-white" id="foot">
//       <div className="flex justify-center items-center bg-white sm:bg-[#F4F3F0] sm:py-4 h-8 sm:h-[80px] sm:px-8 sm:mt-5 w-28 sm:w-96">
//         <p className=" text-sm sm:text-[27px] font-normal tracking-wider sm:tracking-[7.2px]">Contact Us</p>
//       </div>
//       <div className="flex justify-center flex-wrap mt-4 sm:mt-8">
//         {/* Address Details */}
//         <div className="flex flex-col w-5/12 md:w-5/12">
//           <div className="flex items-start mb-4 md:mb-8">
//             <img className="hidden md:flex w-8 lg:w-12 mr-4" src="/location.png" alt="Location Icon" />
//             <div className="flex-1">
//               <div className="text-[#786756] text-xs sm:text-xl lg:text-2xl font-semibold">Address</div>
//               <div className="text-[#675038] text-[9px] sm:text-sm lg:text-lg mt-1">
//                 E-97 Industrial Area Mandore, Jodhpur 342304, Rajasthan, India
//               </div>
//             </div>
//           </div>
//           <div className="flex items-start md:ml-11 lg:ml-16">
//             <div className="flex-1">
//               <div className="text-[#786756] text-xs sm:text-xl lg:text-2xl font-semibold">Branch Address</div>
//               <div className="text-[#675038] text-[9px] sm:text-sm lg:text-lg mt-1">
//                 F-204-205 Industrial Area Mandore, Jodhpur 342304, Rajasthan, India
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Email Details */}
//         <div className="flex flex-col w-5/12 md:w-5/12 pl-12 xs:pl-20 lg:pl-28">
//           <div className="flex items-start mb-8">
//             <img className="hidden md:flex w-16 lg:w-20 pt-1 mr-4" src="/email.png" alt="Email Icon" />
//             <div className="flex-1 pl-2">
//               <div className="text-[#786756] text-xs sm:text-xl lg:text-2xl font-semibold">Email address</div>
//               <ul className="mt-1 text-[#786756] text-[9px] sm:text-sm lg:text-lg md:list-disc sm:pl-5 lg:pl-8">
//                 <li>info@angiraartexports.com</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Subscribe Section */}
//       <div className="flex justify-end relative bottom-5 sm:bottom-0 lg:mt-8 mr-0.5 xs:mr-3 sm:mr-5 lg:mr-14">
//         <button className="py-0.5 sm:py-1 lg:py-2 px-1.5 sm:px-4  lg:px-8 border rounded-full border-[#786756] bg-white text-[#786756] text-[8px] sm:text-sm lg:text-lg ">
//           Subscribe to newsletter for newest designs
//         </button>
//       </div>
//       <br></br>
//     </footer>
//   );
// }
