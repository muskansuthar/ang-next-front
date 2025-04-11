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

      fetchDataFromApi(`/api/productedge/productedges?productId=${id}`).then(
        (res) => {
          setEdges(res?.edge?.edges);
        }
      );

      fetchDataFromApi(`/api/producttop/producttops?productId=${id}`).then(
        (res) => {
          setTops(res?.top?.tops);
        }
      );

      fetchDataFromApi(
        `/api/productfinish/productfinishes?productId=${id}`
      ).then((res) => {
        setFinishes(res?.finish?.finishes);
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
                className={`absolute md:rotate-90 left-0 sm:left-10 md:left-auto md:top-[-25px] md:-translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md ${
                  currentSlide === 0
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
                className={`absolute right-0 sm:right-10 md:rotate-90 md:right-auto md:bottom-[-25px] md:translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md ${
                  currentSlide >= product.images.length - 3
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
        <div className="w-full md:w-auto text-center md:text-left mt-10 md:mt-0 mb-2 lg:mt-20 text-lg md:text-xl font-sans font-medium tracking-wide md:tracking-[12px] px-3 md:px-6">
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
            <li className="md:list-disc md:marker:text-[9px] mt-2 md:mt-0 z-10">
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