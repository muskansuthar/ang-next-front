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

            fetchDataFromApi(`/api/productedge/productedges?productId=${id}`).then((res) => {
                setEdges(res?.edge?.edges);
            });

            fetchDataFromApi(`/api/producttop/producttops?productId=${id}`).then((res) => {
                setTops(res?.top?.tops);
            });

            fetchDataFromApi(`/api/productfinish/productfinishes?productId=${id}`).then((res) => {
                setFinishes(res?.finish?.finishes);
            });
        }
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

    const getImageUrl = (image) => (image ? `${imageBaseUrl}${image}` : "/placeholder.jpg");

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
                                    currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {/* Slider Images */}
                            <div className="flex md:flex-col gap-2 sm:gap-8 md:gap-4 overflow-hidden" ref={sliderRef}>
                                {product.images.slice(currentSlide, currentSlide + 3).map((image, index) => (
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
                                    currentSlide >= product.images.length - 3 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Main Image */}
                    <div className="order-1 md:order-2 flex items-center justify-center pl-8 pr-8 md:pl-0 md:pr-0 w-full md:w-3/5 z-10 h-[200px] sm:h-[300px] md:h-[480px] lg:h-[600px]">
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
                            className="max-w-none h-[700px] object-cover object-center opacity-50 z-0"
                        />
                    </div>
                </div>

                {/* Product Name */}
                <div className="w-full md:w-auto text-center md:text-left mt-10 md:mt-0 mb-2 lg:mt-20 text-sm md:text-xl font-sans font-medium tracking-wide md:tracking-[12px] pl-4">
                    {product.name}
                </div>

                {/* Product Details */}
                <div className="w-full md:w-auto text-center md:text-left mt-1 text-xs tracking-widest capitalize pl-4">
                    <ul className="ml-4">
                        <li className="md:list-disc md:marker:text-[9px]">
                            <span className="font-medium text-sm md:text-[16px]">Material</span>: {product.topmaterial?.name} / {product.legmaterial?.name} .{" "}
                            <span className="font-medium text-sm md:text-[16px] ml-4">Finish</span>: {product.topfinish?.name}
                        </li>
                    </ul>
                </div>
            </div>

            {/* Tops, Edges, and Finishes */}
            <div className="flex flex-col gap-6 md:gap-10 lg:gap-16 bg-white px-2 pt-6 sm:pt-10 lg:pt-20 border-t border-gray-400">
                {/* Tops */}
                <div className="flex flex-wrap justify-around items-center">
                    {tops?.map((top, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => setSelectedImage(top?.images?.[0])}
                        >
                            <Image
                                src={getImageUrl(top?.images?.[0]) || "/placeholder.jpg"}
                                alt={top?.name?.name || "Top Name"}
                                width={100}
                                height={50}
                                className="w-[50px] h-[25px] md:w-[100px] md:h-[50px]"
                            />
                            <p className="pt-1 text-[10px] md:text-sm xl:text-base">{top?.name?.name}</p>
                        </div>
                    ))}
                </div>

                {/* Edges */}
                <div className="flex flex-wrap justify-around items-center">
                    {edges?.map((edge, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => setSelectedImage(edge?.images?.[0])}
                        >
                            <Image
                                src={getImageUrl(edge?.images?.[0]) || "/placeholder.jpg"}
                                alt={edge?.name?.name || "Edge Name"}
                                width={100}
                                height={18}
                                className="w-[70px] h-[10px] md:w-[100px] md:h-[18px]"
                            />
                            <p className="pt-1 text-[10px] md:text-sm xl:text-base">{edge?.name?.name}</p>
                        </div>
                    ))}
                </div>

                {/* Finishes */}
                <div className="flex flex-wrap justify-around items-center mb-8">
                    {finishes?.map((finish, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => setSelectedImage(finish?.images?.[0])}
                        >
                            <Image
                                src={getImageUrl(finish?.images?.[0]) || "/placeholder.jpg"}
                                alt={finish?.name?.name || "Finish Name"}
                                width={100}
                                height={80}
                                className="w-[50px] h-[40px] md:w-[100px] md:h-[80px]"
                            />
                            <p className="pt-1 text-[10px] md:text-sm xl:text-base">{finish?.name?.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { fetchDataFromApi } from "@/utils/api";

// export default function DiningDetails({ params }) {
//     const { id } = params; // Get the product ID from the URL
//     const [product, setProduct] = useState(null);
//     const [edges, setEdges] = useState([]);
//     const [tops, setTops] = useState([]);
//     const [finishes, setFinishes] = useState([]);
//     const [selectedImage, setSelectedImage] = useState(null); // State to manage the main image and background image
//     const [currentIndex, setCurrentIndex] = useState(0);


//     useEffect(() => {
//         if (id) {
//             // Fetch product details
//             fetchDataFromApi(`/api/products/${id}`).then((res) => {
//                 setProduct(res);
//                 setSelectedImage(res?.images?.[0]); // Set the first image as the default selected image
//             });

//             // Fetch product edges
//             fetchDataFromApi(`/api/productedge/productedges?productId=${id}`).then((res) => {
//                 setEdges(res?.edge?.edges);
//             });

//             // Fetch product tops
//             fetchDataFromApi(`/api/producttop/producttops?productId=${id}`).then((res) => {
//                 setTops(res?.top?.tops);
//             });

//             // Fetch product finishes
//             fetchDataFromApi(`/api/productfinish/productfinishes?productId=${id}`).then((res) => {
//                 setFinishes(res?.finish?.finishes);
//             });
//         }
//     }, [id]);

//     if (!product) {
//         return <p>Loading...</p>;
//     }

//     const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

//     const getImageUrl = (image) => (image ? `${imageBaseUrl}${image}` : "/placeholder.jpg");

//     return (
//         <div className="bg-gray-100 overflow-x-hidden 2xl:container mx-auto">
//             <div className="bg-white pt-10 px-2 md:pt-20 pb-3 relative">
//                 <div className="flex flex-col md:flex-row w-full md:items-center justify-around lg:justify-start">
//                     {/* Thumbnail Images */}
//                     {/* <div className="order-2 md:order-1 w-full md:w-1/6 md:h-full">
//                         <div className="h-full flex mt-10 md:mt-0 md:flex-col items-center justify-around md:gap-20">
//                             {product.images.map((image, index) => (
//                                 <Image
//                                     key={index}
//                                     src={getImageUrl(image) || "/placeholder.jpg"}
//                                     width={175}
//                                     height={145}
//                                     alt={`Thumbnail ${index + 1}`}
//                                     className="block w-[100px] sm:w-[175px] cursor-pointer"
//                                     onClick={() => setSelectedImage(image)} // Update both main and background images on click
//                                 />
//                             ))}
//                         </div>
//                     </div> */}

// <div className="order-2 md:order-1 w-full md:w-1/6 md:h-full">
//     <div className="h-full flex flex-col items-center justify-around md:gap-20 relative">
//         {/* Slider Container */}
//         <div className="flex overflow-hidden w-full h-full">
//             <div
//                 className="flex transition-transform duration-300"
//                 style={{ transform: `translateX(-${currentIndex * 50}%)` }}
//             >
//                 {product.images.map((image, index) => (
//                     <div
//                         key={index}
//                         className="flex-shrink-0 w-1/2 flex justify-center items-center"
//                     >
//                         <Image
//                             src={getImageUrl(image) || "/placeholder.jpg"}
//                             width={175}
//                             height={145}
//                             alt={`Thumbnail ${index + 1}`}
//                             className="block w-[100px] sm:w-[175px] cursor-pointer"
//                             onClick={() => setSelectedImage(image)} // Update both main and background images on click
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>

//         {/* Previous Button */}
//         {currentIndex > 0 && (
//             <button
//                 onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
//                 className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-md z-10"
//             >
//                 &#8592;
//             </button>
//         )}

//         {/* Next Button */}
//         {currentIndex < Math.ceil(product.images.length / 2) - 1 && (
//             <button
//                 onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, Math.ceil(product.images.length / 2) - 1))}
//                 className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-md z-10"
//             >
//                 &#8594;
//             </button>
//         )}
//     </div>
// </div>


//                     {/* Main Image */}
//                     <div className="order-1 md:order-2 flex items-center justify-center w-full md:w-3/5 md:h-2/3 z-10">
//                         <Image
//                             src={getImageUrl(selectedImage) || "/placeholder.jpg"} // Main image uses selectedImage
//                             width={780}
//                             height={410}
//                             alt={product.name}
//                             className="max-w-none w-[250px] h-[150px] md:w-[500px] md:h-[200px] lg:h-[300px] lg:w-[700px]"
//                         />
//                     </div>

//                     {/* Background Image */}
//                     <div className="absolute right-0 w-5/12 hidden lg:block">
//                         <Image
//                             src={getImageUrl(selectedImage) || "/placeholder.jpg"} // Background image uses selectedImage
//                             width={520}
//                             height={600}
//                             alt="Background Image"
//                             className="max-w-none h-[700px] object-cover object-center opacity-50 z-0"
//                         />
//                     </div>

//                 </div>

//                 {/* Product Name */}
//                 <div className="w-full md:w-auto text-center md:text-left mt-10 mb-2 lg:mt-32 text-sm md:text-xl font-sans font-medium tracking-wide md:tracking-[12px] pl-4">
//                     {product.name}
//                 </div>

//                 {/* Product Details */}
//                 <div className="w-full md:w-auto text-center md:text-left mt-1 text-xs tracking-widest capitalize pl-4">
//                     <ul className="ml-4">
//                         <li className="md:list-disc md:marker:text-[9px]">
//                             <span className="font-medium text-sm md:text-[16px]">Material</span>: {product.topmaterial?.name} / {product.legmaterial?.name} .{" "}
//                             <span className="font-medium text-sm md:text-[16px] ml-4">Finish</span>: {product.topfinish?.name}
//                         </li>
//                     </ul>
//                 </div>
//             </div>

//             {/* Tops, Edges, and Finishes */}
//             <div className="flex flex-col gap-6 md:gap-10 lg:gap-16 bg-white px-2 pt-6 sm:pt-10 lg:pt-20 border-t border-gray-400">
//                 {/* Tops */}
//                 <div className="flex flex-wrap justify-around items-center">
//                     {tops?.map((top, index) => (
//                         <div
//                             key={index}
//                             className="flex flex-col items-center cursor-pointer"
//                             onClick={() => setSelectedImage(top?.images?.[0])} // Update both images on click
//                         >
//                             <Image
//                                 src={getImageUrl(top?.images?.[0]) || "/placeholder.jpg"}
//                                 alt={top?.name?.name || "Top Name"}
//                                 width={100}
//                                 height={50}
//                                 className="w-[50px] h-[25px] md:w-[100px] md:h-[50px]"
//                             />
//                             <p className="pt-1 text-[10px] md:text-sm xl:text-base">{top?.name?.name}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Edges */}
//                 <div className="flex flex-wrap justify-around items-center">
//                     {edges?.map((edge, index) => (
//                         <div
//                             key={index}
//                             className="flex flex-col items-center cursor-pointer"
//                             onClick={() => setSelectedImage(edge?.images?.[0])} // Update both images on click
//                         >
//                             <Image
//                                 src={getImageUrl(edge?.images?.[0]) || "/placeholder.jpg"}
//                                 alt={edge?.name?.name || "Edge Name"}
//                                 width={100}
//                                 height={18}
//                                 className="w-[70px] h-[10px] md:w-[100px] md:h-[18px]"
//                             />
//                             <p className="pt-1 text-[10px] md:text-sm xl:text-base">{edge?.name?.name}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Finishes */}
//                 <div className="flex flex-wrap justify-around items-center mb-8">
//                     {finishes?.map((finish, index) => (
//                         <div
//                             key={index}
//                             className="flex flex-col items-center cursor-pointer"
//                             onClick={() => setSelectedImage(finish?.images?.[0])} // Update both images on click
//                         >
//                             <Image
//                                 src={getImageUrl(finish?.images?.[0]) || "/placeholder.jpg"}
//                                 alt={finish?.name?.name || "Finish Name"}
//                                 width={100}
//                                 height={80}
//                                 className="w-[50px] h-[40px] md:w-[100px] md:h-[80px]"
//                             />
//                             <p className="pt-1 text-[10px] md:text-sm xl:text-base">{finish?.name?.name}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
