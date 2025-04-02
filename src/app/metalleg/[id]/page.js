"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fetchDataFromApi } from "@/utils/api";

export default function MetalLegDetail({ params }) {
    const { id } = params; // Get the product ID from the URL
    const [product, setProduct] = useState(null);
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

    const getImageUrl = (image) => (image ? `${imageBaseUrl}${image}` : "/placeholder.jpg");

    return (
        <div className="2xl:container px-4 sm:px-8 mx-auto mb-4 border-b border-gray-400">
            <div className="relative">
                {/* Background Image */}
                <div className="hidden lg:block absolute top-0 right-0 w-1/3">
                    <Image
                        src={getImageUrl(selectedImage) || "/mtbg.png"}
                        alt="Background"
                        width={400}
                        height={600}
                        className="max-w-none h-[600px] object-cover object-center opacity-50 z-0"
                    />
                </div>

                <div className="flex flex-wrap">
                    {/* Main Content */}
                    <div className="w-full lg:w-8/12">
                        {/* Large Image */}
                        <div className="flex justify-center items-center mt-12 h-[180px] sm:h-[220px] md:h-[300px]">
                            <Image
                                src={getImageUrl(selectedImage) || "/mtbm.png"}
                                alt="Metal Leg Big"
                                width={600}
                                height={400}
                                className="mx-auto object-contain max-h-full"
                            />
                        </div>

                        {/* Small Images */}
                        <div className="relative flex justify-center items-center mt-8 sm:mt-14 z-10">
                            {/* Previous Button */}
                            <button
                                onClick={prevSlide}
                                disabled={currentSlide === 0}
                                className={`absolute left-2 sm:left-10 lg:left-2 z-10 bg-white p-1 rounded-full shadow-md ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {/* Slider Images */}
                            <div className="flex gap-4 justify-center overflow-hidden mx-8" ref={sliderRef}>
                                {product.images.slice(currentSlide, currentSlide + 3).map((image, index) => (
                                    <Image
                                        key={index}
                                        src={getImageUrl(image) || "/ct1.png"}
                                        alt={`Product Image ${index + 1}`}
                                        width={150}
                                        height={150}
                                        className="w-1/4 sm:w-[130px] md:w-[180px] cursor-pointer"
                                        onClick={() => setSelectedImage(image)}
                                    />
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={nextSlide}
                                disabled={currentSlide >= product.images.length - 3}
                                className={`absolute right-2 sm:right-10 lg:right-2 z-10 bg-white p-1 rounded-full shadow-md ${currentSlide >= product.images.length - 3 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Empty Box 2 for spacing */}
                    <div className="hidden md:block w-full h-12"></div>

                    <div className="flex w-full flex-col items-center md:items-start">
                        {/* Text Content */}
                        <div className="w-full md:w-auto text-center md:text-left mt-6 mb-2 text-sm md:text-xl font-sans font-medium tracking-wide md:tracking-[12px]">
                            {product.name}
                        </div>
                        <div className="w-full md:w-auto text-center md:text-left mt-1 mb-6 text-xs sm:text-[14px] tracking-widest capitalize">
                            <ul className="ml-4">
                                <li className="md:list-disc md:marker:text-[9px]">
                                    <span className="font-medium text-sm md:text-[16px]">Material</span>: {product.legmaterial?.name} .{" "}
                                    <span className="font-medium text-sm md:text-[16px] ml-4">Finish</span>: {product.legfinish?.name}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}



// import Image from 'next/image';

// export default function MetalLegDetail() {
//     return (
//         <div className="2xl:container px-4 sm:px-8 mx-auto">
//             <div className="relative">
//                 {/* Background Image */}
//                 <div className="hidden md:block absolute top-0 right-0 w-1/3">
//                     <Image src="/mtbg.png" width={400} height={600} alt="Background" />
//                 </div>

//                 <div className="flex flex-wrap">
//                     {/* Empty Space */}
//                     <div className="hidden md:block md:w-8/12 h-20"></div>

//                     {/* Main Content */}
//                     <div className="w-full md:w-8/12">
//                         {/* Large Image */}
//                         <div className="flex justify-center items-center mt-12">
//                             <Image src="/mtbm.png" width={600} height={400} alt="Metal Leg Big" className="w-full md:w-4/5" />
//                         </div>

//                         {/* Small Images */}
//                         <div className="flex justify-evenly items-center mt-8 sm:mt-20">
//                             <Image src="/mt1.png" width={300} height={200} alt="Metal Leg Small 1" className="w-1/4" />
//                             <Image src="/mt3.png" width={150} height={200} alt="Metal Leg Small 2" className="w-1/4" />
//                         </div>
//                     </div>

//                     {/* Empty Box 2 for spacing */}
//                     <div className="hidden md:block w-full h-12"></div>


//                     {/* Text Content */}
//                     <div className="w-full md:w-auto text-center md:text-left mt-6 mb-2 text-sm md:text-xl font-sans font-medium tracking-wide md:tracking-[12px]">
//                         Parquetry Dining Table With Spider Leg (Tube 7.5 x7.5)
//                     </div>
//                     <div className="w-full md:w-auto text-center md:text-left mt-1 mb-6 text-xs sm:text-[14px] tracking-widest capitalize">
//                         <ul className='ml-4'>
//                             <li className='md:list-disc md:marker:text-[9px]'>
//                                 <span className="font-medium text-sm md:text-[16px]">material</span> : acacia / iron . <span className="font-medium text-sm md:text-[16px] ml-4">finish</span> : espresso
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
