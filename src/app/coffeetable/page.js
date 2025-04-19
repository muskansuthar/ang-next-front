"use client"
import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link'
import Image from "next/image";
import { fetchDataFromApi } from "@/utils/api";
import { MyContext } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { togVariants, headVariants, slideInRight } from "@/utils/animation";


export default function Coffeetable() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [legFinishData, setLegfinishData] = useState([]);
  const [legMaterialData, setLegmaterialData] = useState([]);
  const [topFinishData, setTopfinishData] = useState([]);
  const [topMaterialData, setTopmaterialData] = useState([]);
  const [filters, setFilters] = useState({
    topmaterial: "",
    legmaterial: "",
    topfinish: "",
    legfinish: ""
  });

  const context = useContext(MyContext);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  useEffect(() => {
    window.scrollTo(0, 0)

    fetchDataFromApi("/api/category/search?name=Coffee Table").then((res) => {
      setCategoryData(res?.categoryList);
    });
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      // Remove empty values from the filters object
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      const queryParams = new URLSearchParams(cleanedFilters).toString();
      const res = await fetchDataFromApi(`/api/products/filter?category=Coffee Table&${queryParams}`);
      setProducts(res.products);
    };

    fetchProducts();
  }, [filters]);

  useEffect(() => {
    if (context) {
      setLegfinishData(context.legfinishData || []);
      setLegmaterialData(context.legmaterialData || []);
      setTopfinishData(context.topfinishData || []);
      setTopmaterialData(context.topmaterialData || []);
    }
  }, [context]);

  const handleOptionClick = (label, value) => {
    if (value === "all") {
      setFilters({
        topmaterial: "",
        legmaterial: "",
        topfinish: "",
        legfinish: ""
      });
      fetchDataFromApi("/api/products/filter?category=Coffee Table").then((res) => {
        setProducts(res.products);
        setOpenDropdown(null);

      })
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters, [label]: value };

        // Remove empty values from the filters object
        Object.keys(updatedFilters).forEach((key) => {
          if (updatedFilters[key] === "") {
            delete updatedFilters[key];
          }
        });

        return updatedFilters;
      });

      setOpenDropdown(null); // Close the dropdown
    }
  };

  const filterOptions = {
    "Top Material": topMaterialData,
    "Leg Material": legMaterialData,
    "Top Finish": topFinishData,
    "Leg Finish": legFinishData,
    "Category": [
      { _id: "all", name: "Coffee Table" }, // Add "All" option
    ],
    "Remove Filters": [
      { _id: "all", name: "All Products" }, // Add "All" option
    ]
  };

  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

  const getImageUrl = (image) => (image ? `${imageBaseUrl}${image}` : "/placeholder.jpg");

  return (
    <div className="w-full pb-4 h-auto font-sans overflow-x-hidden">
      <div className="2xl:container my-5 mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap mt-3 items-center">
          <div className="w-full xs:w-7/12 lg:shadow-[100px_0px_50px_15px_white] lg:px-10">
            <div className="hidden lg:block h-[85px]"></div>
            <motion.div
              className="flex justify-center font-normal md:font-thin text-2xl md:text-4xl tracking-wide sm:tracking-[12px] uppercase"
              initial="offscreen"
              whileInView="onscreen"
              variants={headVariants}
            >
              {categoryData[0]?.name}
            </motion.div>
            <motion.p
              className="text-center font-normal md:font-thin text-xs sm:text-base md:text-lg mt-4 mb-4 xs:px-2 sm:px-10 md:px-8 lg:px-0 lg:mb-16 tracking-[1.88px] capitalize leading-[1.7]"
              initial="offscreen"
              whileInView="onscreen"
              variants={togVariants}
            >
              Delve into a curated selection of the finest coffee table designs, meticulously crafted to elevate your living space, offering visual appeal and functionality that enhances your daily living experience.
            </motion.p>
          </div>
          <motion.div
            className="w-full xs:w-5/12 flex items-center justify-center lg:justify-end -z-10"
            initial="offscreen"
            whileInView="onscreen"
            variants={slideInRight}
          >
            <div className="relative w-[90%] aspect-[4/3] lg:ml-2">
              <Image
                src={getImageUrl(categoryData[0]?.images[0]) || "/placeholder.jpg"}
                alt="Coffee Table"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 45vw, 35vw"
              />
            </div>
          </motion.div>
        </div>

        <div className="my-4 px-auto grid grid-cols-3 md:grid-cols-6 text-center xl:text-start">
          {Object.entries(filterOptions).map(([label, options]) => (
            <div key={label} className="relative flex justify-center">
              <button
                onClick={() => toggleDropdown(label)}
                className="inline-flex justify-between items-center py-2 focus:outline-none text-xs sm:text-base"
              >
                {label} <IoIosArrowDown />
              </button>

              {openDropdown === label && options.length > 0 && (
                <div className="flex flex-col items-center absolute mt-10 w-24 z-10 sm:w-44 bg-white border border-gray-200 rounded-md shadow-lg">
                  {options.map((option) => (
                    <button
                      key={option._id}
                      value={option._id}
                      onClick={() => handleOptionClick(label.toLowerCase().replace(" ", ""), option._id)}
                      className="block sm:px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-center text-xs sm:text-base"
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 md:gap-6">
          {products?.length > 0 ? (
            products?.map((product) => (
              <Link
                key={product._id}
                href={`/coffeetable/${product._id}`}
                className="flex flex-col items-center justify-center border p-1 md:p-4 h-36 sm:h-40 md:h-44 lg:h-56 xl:h-64 2xl:h-80 text-center hover:scale-105 transition-transform"
              >
                <div className="flex-grow flex items-center justify-center w-[80%] h-[50%]">
                  <Image
                    src={getImageUrl(product?.images[0]) || "/placeholder.jpg"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="w-full text-xs sm:text-sm md:text-[17px] md:tracking-[2px] md:leading-6">
                  {product.name}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-3 mt-10">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
