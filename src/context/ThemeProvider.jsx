"use client";

import { useEffect, useState } from "react";
import { MyContext } from "./ThemeContext";
import { fetchDataFromApi } from "@/utils/api";

const ThemeProvider = ({ children }) => {
  const [isOpenProductModal, setisOpenProductModal] = useState({
    id: "",
    open: false,
  });
  const [productData, setProductData] = useState([]);

  const [categoryData, setCategoryData] = useState([]);
  const [legfinishData, setLegfinishData] = useState([]);
  const [legmaterialData, setLegmaterialData] = useState([]);
  const [topfinishData, setTopfinishData] = useState([]);
  const [topmaterialData, setTopmaterialData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {

    fetchDataFromApi("/api/category").then((res) => {
      setCategoryData(res?.categoryList);
    });
    fetchDataFromApi("/api/legfinish").then((res) => {
      setLegfinishData(res?.legFinishes);
    });
    fetchDataFromApi("/api/legmaterial").then((res) => {
      setLegmaterialData(res?.legMaterials);
    });
    fetchDataFromApi("/api/topfinish").then((res) => {
      setTopfinishData(res?.topFinishes);
    });
    fetchDataFromApi("/api/topmaterial").then((res) => {
      setTopmaterialData(res?.topMaterials);
    });
  }, []);

  useEffect(() => {
    isOpenProductModal.open === true &&
      fetchDataFromApi(`/api/products/${isOpenProductModal.id}`).then((res) => {
        setProductData(res);
      });
  }, [isOpenProductModal]);


  const values = {
    isOpenProductModal,
    setisOpenProductModal,
    categoryData,
    setCategoryData,
    legfinishData,
    legmaterialData,
    topfinishData,
    topmaterialData,
    productData,
    setProductData,
    searchData,
    setSearchData,
  };

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
};

export default ThemeProvider;
