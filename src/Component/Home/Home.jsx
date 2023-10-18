import React from "react";
import Products from "../Products/Products";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";

import { Helmet } from "react-helmet";
export default function Home() {


  return (
    <>
      <div className=" mt-5 py-3">
        <div className="container">
          <MainSlider />
        </div>
        <CategorySlider />
        <Products />

      </div>
      
      <Helmet>
        <title>Home</title>
      </Helmet>

    </>
  );
}
