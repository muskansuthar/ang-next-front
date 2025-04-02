"use client"
import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link'
import Image from "next/image";
import { fetchDataFromApi } from "@/utils/api";
import { MyContext } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { headVariants } from "@/utils/animation";

// this is chatgpt code
export default function SearchPage() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [products, setProducts] = useState([]); // Displayed products
  const [baseProducts, setBaseProducts] = useState([]); // Products for further filtering
  const [categoryData, setCategoryData] = useState([]);
  const [legFinishData, setLegfinishData] = useState([]);
  const [legMaterialData, setLegmaterialData] = useState([]);
  const [topFinishData, setTopfinishData] = useState([]);
  const [topMaterialData, setTopmaterialData] = useState([]);
  const [filters, setFilters] = useState({
    topmaterial: "",
    legmaterial: "",
    topfinish: "",
    legfinish: "",
    category: "",
    knockeddown: "",
  });

  const context = useContext(MyContext);

  // Set initial products from searchData
  useEffect(() => {
    setProducts(context.searchData);
    setBaseProducts(context.searchData); // Base products for category filtering
  }, [context.searchData]);

  // Dropdown toggle
  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Handle filter changes
  const handleOptionClick = (label, value) => {
    if (label === "category") {
      setFilters({
        topmaterial: "",
        legmaterial: "",
        topfinish: "",
        legfinish: "",
        category: "",
        knockeddown: "",
      });
      fetchDataFromApi(`/api/products/category?category=${value}`).then((res) => {
        setBaseProducts(res.products); // Update base products for further filtering
        setProducts(res.products);
        setOpenDropdown(null);
      }) 
    } else if (label === "knockeddown") {
      setFilters({
        topmaterial: "",
        legmaterial: "",
        topfinish: "",
        legfinish: "",
        category: "",
        knockeddown: "",
      });
      setProducts(context.searchData); // Show all products
      setBaseProducts(context.searchData);
      setOpenDropdown(null);
    } else {
      const updatedFilters = {
        ...filters,
        [label.toLowerCase().replace(" ", "")]: value,
      };

      setFilters(updatedFilters);

      // Apply filters to the base products
      const filteredProducts = baseProducts.filter((product) => {
        return Object.entries(updatedFilters).every(([key, filterValue]) => {
          if (!filterValue) return true; // Ignore empty filters
          return product[key] === filterValue;
        });
      });

      setProducts(filteredProducts);
      setOpenDropdown(null);
    }
  };

  // Set dropdown options from context 
  useEffect(() => {
    if (context) {
      setCategoryData(context.categoryData || []);
      setLegfinishData(context.legfinishData || []);
      setLegmaterialData(context.legmaterialData || []);
      setTopfinishData(context.topfinishData || []);
      setTopmaterialData(context.topmaterialData || []);
    }
  }, [context]);

  const filterOptions = {
    "Top Material": topMaterialData,
    "Leg Material": legMaterialData,
    "Top Finish": topFinishData,
    "Leg Finish": legFinishData,
    "Category": categoryData,
    "Knocked Down": [{ _id: "all", name: "Searched Products" }], // Add "All" option
  };

  const imageBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/uploads/`;

  const getImageUrl = (image) =>
    image ? `${imageBaseUrl}${image}` : "/placeholder.jpg";

  return (
    <div className="2xl:container my-5 mx-auto px-4 sm:px-8">
      {/* Header */}
      <div className="flex flex-wrap mt-6 mb-6 md:mt-12 md:mb-12">
        <div className="w-full">
          <motion.div
            className="flex justify-center font-thin text-3xl sm:text-4xl tracking-wide sm:tracking-[12px]"
            initial="offscreen"
            whileInView="onscreen"
            variants={headVariants}
          >
            Products
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="my-4 mb-2 md:mb-6 px-auto grid grid-cols-3 xl:grid-cols-6 text-center xl:text-start">
        {Object.entries(filterOptions).map(([label, options]) => (
          <div key={label} className="relative flex justify-center">
            <button
              onClick={() => toggleDropdown(label)}
              className="inline-flex justify-between items-center py-2 focus:outline-none text-xs sm:text-base"
            >
              {label} <IoIosArrowDown />
            </button>

            {openDropdown === label && options.length > 0 && (
              <div className="flex flex-col items-center absolute mt-10 w-24 z-10 sm:w-32 bg-white border border-gray-200 rounded-md shadow-lg">
                {options.map((option) => (
                  <button
                    key={option._id}
                    value={option._id}
                    onClick={() =>
                      handleOptionClick(label.toLowerCase().replace(" ", ""), option._id)
                    }
                    className="block sm:px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-center"
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Products */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 md:gap-6">
        {products?.length > 0 ? (
          products?.map((product) => (
            <Link
              key={product._id}
              href={`/diningtable/${product._id}`}
              className="flex flex-col items-center justify-center border h-36 sm:h-40 md:h-44 lg:h-56 xl:h-64 2xl:h-80 text-center hover:scale-105 transition-transform"
            >
              <div className="flex-grow flex items-center justify-center w-[90%] overflow-hidden">
                <Image
                  src={getImageUrl(product?.images[0]) || "/placeholder.jpg"}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-3/4 mx-auto object-contain max-h-full"
                />
              </div>
              <div className="text-xs sm:text-sm lg:text-[17px] sm:tracking-[3px] p-1 md:p-3 mt-auto overflow-hidden text-ellipsis whitespace-nowrap">
                {product.name}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-2 mt-10">No products available.</p>
        )}
      </div>

    </div>
  );
}