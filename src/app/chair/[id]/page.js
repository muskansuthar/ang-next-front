"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fetchDataFromApi } from "@/utils/api";

export default function StoolDetails({ params }) {
  const { id } = params; // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [edges, setEdges] = useState([]);
  const [tops, setTops] = useState([]);
  const [finishes, setFinishes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (id) {
      // Fetch product details
      fetchDataFromApi(`/api/products/${id}`).then((res) => {
        setProduct(res);
        setSelectedImage(res?.images?.[0]);
      });
    }
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

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

  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

  const getImageUrl = (image) =>
    image ? `${imageBaseUrl}${image}` : "/placeholder.jpg";

  return (
    <div className="2xl:container mx-auto">
      <div className="relative">
        {/* Background Image */}
        <div className="hidden lg:block absolute top-4 right-0 w-5/12">
          <Image
            src={getImageUrl(selectedImage) || "/stbg.png"}
            alt="Background"
            width={430}
            height={326}
            className="max-w-none w-full h-[700px] opacity-20 z-0"
          />
        </div>

        <div className="flex flex-wrap">
          {/* Main Content */}
          <div className="w-full lg:w-7/12 mr-4 ml-4">
            {/* Big Image */}
            <div className="flex justify-center items-center mt-12 h-[200px] sm:h-[300px] md:h-[400px]">
              <Image
                src={getImageUrl(selectedImage) || "/sbm.png"}
                alt="Stool"
                width={530}
                height={326}
                className="mx-auto object-contain max-h-full"
              />
            </div>

            {/* Small Images */}
            <div className="relative flex justify-center items-center mt-8 sm:mt-14 z-10 h-36">
              {/* Previous Button */}
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`absolute left-2 sm:left-10 lg:left-16 z-10 bg-white p-1 rounded-full shadow-md ${currentSlide === 0
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
                className="flex gap-6 justify-center overflow-hidden mx-8 h-full"
                ref={sliderRef}
              >
                {product.images
                  .slice(currentSlide, currentSlide + 3)
                  .map((image, index) => (
                    <Image
                      key={index}
                      src={getImageUrl(image) || "/placeholder.jpg"}
                      alt={`Product Image ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-1/4 md:w-auto cursor-pointer object-contain"
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                disabled={currentSlide >= product.images.length - 3}
                className={`absolute right-2 sm:right-10 lg:right-16 z-10 bg-white p-1 rounded-full shadow-md ${currentSlide >= product.images.length - 3
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

          <div className="flex w-full md:ml-4 mb-4 md:mt-4 flex-col items-center md:items-start">
            <div className="w-full md:w-auto text-center md:text-left md:mt-4 mb-2 lg:mt-8 text-lg md:text-xl font-sans font-medium tracking-wide md:tracking-[6px] px-3 md:px-6">
              Product Code : {product.code}
            </div>
            <div className="w-full md:w-auto text-center md:text-left mb-2 text-lg md:text-xl font-sans font-medium tracking-wide md:tracking-[12px] px-3 md:px-6">
              {product.name}
            </div>

            <div className="w-full text-center md:text-left mt-1 mb-3 text-xs tracking-widest px-3 md:px-10">
              <ul className="flex flex-col md:flex-row justify-between">
                <li className="md:list-disc md:marker:text-[9px] capitalize">
                  <span className="font-medium text-sm md:text-[16px]">
                    Material :
                  </span><span className="text-[14px]"> {product.topmaterial?.name} / {product.legmaterial?.name} .</span>
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
      </div>
    </div>
  );
}
