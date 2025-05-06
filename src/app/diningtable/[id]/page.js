"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { fetchDataFromApi } from "@/utils/api";

export default function DiningDetails({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [edges, setEdges] = useState([]);
  const [tops, setTops] = useState([]);
  const [finishes, setFinishes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (id) {
      fetchDataFromApi(`/api/products/${id}`).then((res) => {
        setProduct(res);
        setSelectedImage(res?.images?.[0]);
      });
    }
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

  const getImageUrl = (image) =>
    image ? `${imageBaseUrl}${image}` : "/placeholder.jpg";

  const nextSlide = () => {
    if (currentSlide < product.images.length - 3) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="bg-gray-100 overflow-x-hidden 2xl:container mx-auto">
      <div className="bg-white pt-10 px-2 md:pt-0 lg:pt-20 pb-3 relative">
        <div className="flex flex-col md:flex-row w-full md:items-center justify-around lg:justify-start">
          {/* Thumbnail Images Slider */}
          <div className="order-2 md:order-1 w-full md:w-1/6 md:h-full">
            <div className="h-full flex mt-10 md:mt-0 md:flex-col items-center justify-around md:gap-20 relative">
              {/* Previous Button */}
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`absolute md:rotate-90 left-0 sm:left-10 md:left-auto md:top-[-25px] md:-translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md ${currentSlide === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Slider Images */}
              <div
                className="flex md:flex-col gap-2 sm:gap-8 md:gap-4 overflow-hidden"
                ref={sliderRef}
              >
                {product.images
                  .slice(currentSlide, currentSlide + 3)
                  .map((image, index) => (
                    <Image
                      key={index}
                      src={getImageUrl(image) || "/placeholder.jpg"}
                      width={175}
                      height={145}
                      alt={`Thumbnail ${index + 1}`}
                      className="block w-[80px] sm:w-[150px] lg:w-[175px] cursor-pointer h-[80px] sm:h-[100px] lg:h-[150px]  object-contain"
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                disabled={currentSlide >= product.images.length - 3}
                className={`absolute right-0 sm:right-10 md:rotate-90 md:right-auto md:bottom-[-25px] md:translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md ${currentSlide >= product.images.length - 3
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div className="order-1 md:order-2 flex flex-col items-center justify-center pl-8 pr-8 md:pl-0 md:pr-0 w-full md:w-3/5 z-10 h-[200px] sm:h-[300px] md:h-[480px] lg:h-[600px]">
            <Image
              src={getImageUrl(selectedImage) || "/placeholder.jpg"}
              width={780}
              height={410}
              alt={product.name}
              className="mx-auto object-contain max-h-full"
            />
          </div>

          {/* Background Image */}
          <div className="absolute right-0 w-5/12 hidden lg:block">
            <Image
              src={getImageUrl(selectedImage) || "/placeholder.jpg"}
              width={520}
              height={600}
              alt="Background Image"
              className="max-w-none w-full h-[700px] object-cover object-center opacity-20 z-0"
            />
          </div>
        </div>

        {/* Product Name */}
        <div className="w-full md:w-auto text-center md:text-left mt-10 md:mt-0 mb-2 lg:mt-8 text-lg md:text-xl font-sans font-medium tracking-wide px-3 md:px-6">
          <span className="font-medium text-sm md:text-[16px]">
            Product Code :
          </span><span className="text-[14px]"> {product.code}</span>
        </div>
        <div className="w-full md:w-auto text-center md:text-left mb-2 text-lg md:text-xl font-sans font-medium tracking-wide md:tracking-[12px] px-3 md:px-6">
          {product.name}
        </div>

        {/* Product Details */}
        <div className="w-full text-center md:text-left mt-1 mb-3 text-xs tracking-widest px-3 md:px-10">
          <ul className="flex flex-col md:flex-row justify-between">
            <li className="md:list-disc md:marker:text-[9px] capitalize">
              <span className="font-medium text-sm md:text-[16px]">
                Material :
              </span><span className="text-[14px]"> {product.topmaterial?.name} / {product.legmaterial?.name} .{" "}</span>
              <span className="font-medium text-sm md:text-[16px] ml-4">
                Finish :
              </span><span className="text-[14px]"> {product.topfinish?.name}</span>
            </li>
            <li className="md:list-disc md:marker:text-[9px] mt-2 md:mt-0 z-10 md:ml-4">
              <span className="font-medium text-sm md:text-[16px]">
                Size :
              </span><span className="text-[14px]"> {product.length} x {product.width} x {product.height} .</span>
              <span className="font-medium text-sm md:text-[16px] ml-4">
                Cbm :
              </span><span className="text-[14px]"> {product.cbm}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


// import Image from "next/image"

// export default function ProductPage() {
//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       <div className="flex items-start">
//         <h1 className="text-3xl font-normal tracking-[12px] text-[#8F7C6D] mb-10">10723</h1>
//       </div>
//       <div className="flex">
//         <div className="w-4/12 px-8 space-y-6">
//           <div className="bg-gray-100 flex h-64 p-4">
//             <Image
//               src="/db.png"
//               alt="Live Edge Slab Dining Table"
//               width={300}
//               height={200}
//               className="object-contain w-full"
//             />
//           </div>

//           <div className="bg-gray-100 flex h-64 p-4">
//             <Image
//               src="/dc.png"
//               alt="Live Edge Slab Dining Table Side View"
//               width={300}
//               height={200}
//               className="object-contain w-full"
//             />
//           </div>

//           <div className="flex flex-col font-medium justify-center items-center text-md text-[#8F7C6D]">
//             <div className="tracking-[6px]">240cm x 100cm x 77cm.</div>
//             <div className="tracking-[6px] mt-3">CBM: 0.334</div>
//           </div>
//         </div>

//         <div className="w-8/12">
//           <div>
//             <h2 className="text-2xl font-normal tracking-[8px] text-[#8F7C6D]">
//               Live Edge Slab Dining Table With Swiss Spider Leg
//             </h2>
//           </div>

//           <div>
//             <div className="p-8 border-l" style={{ borderLeftColor: '#8F7C6D', borderLeftWidth: '2px' }}>
//               <div className="bg-gray-100 p-4 h-96 flex relative">
//                 <div className="absolute top-0 left-0 w-32 h-32">
//                   <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-gray-700 via-gray-300 to-gray-100"></div>
//                   <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-gray-700 via-gray-300 to-gray-100"></div>
//                 </div>
//                 <div className="absolute bottom-0 right-0 w-32 h-32">
//                   <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-gray-100 via-gray-300 to-gray-700"></div>
//                   <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-gray-100 via-gray-300 to-gray-700"></div>
//                 </div>
//                 <Image
//                   src="/da.png"
//                   alt="Live Edge Slab Dining Table Main View"
//                   width={500}
//                   height={300}
//                   className="object-contain w-full"
//                 />
//               </div>

//               <div className="mt-14 flex">
//                 <div className="w-7/12 space-y-5">
//                   <div className="flex">
//                     <span className="text-md font-semibold tracking-[6px] text-[#8F7C6D]">Material:</span>
//                     <span className="text-md tracking-[4px] text-[#8F7C6D] pl-2">Acacia Wood, Iron</span>
//                   </div>

//                   <div className="border-t-2 ml-5 opacity-50" style={{ borderColor: '#8F7C6D' }}></div>

//                   <div className="flex">
//                     <span className="text-md font-semibold tracking-[6px] text-[#8F7C6D]">Finish:</span>
//                     <span className="text-md tracking-[4px] text-[#8F7C6D] pl-2">Natural, Black P/C</span>
//                   </div>
//                 </div>
//                 <div className="w-5/12 flex justify-end items-center relative">
//                   <div className="absolute right-[50px] w-20 z-20">
//                     <Image
//                       src="/de.png"
//                       alt="Live Edge Slab Dining Table"
//                       width={300}
//                       height={200}
//                       className="object-contain w-full"
//                     />
//                   </div>
//                   <div className="absolute w-20">
//                     <Image
//                       src="/dd.png"
//                       alt="Live Edge Slab Dining Table"
//                       width={300}
//                       height={200}
//                       className="object-contain w-full"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }