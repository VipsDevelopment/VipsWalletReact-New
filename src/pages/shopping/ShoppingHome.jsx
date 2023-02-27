import React, { useState, useEffect } from "react";
import "../../assets/styles/shopping/shoppingHome.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { getSliderBannerImages } from "../../apiData/media/home";
import { getAllCategories } from "../../apiData/shopping/category";
import { fashionCategoryId, electronicCategoryId } from "../../constants";
import { Link } from "react-router-dom";
import TopSlider from "../../components/Sliders/shopping/TopSlider";
import DealsofTheDay from "../home/DealsofTheDay";
import { NewArrivalProducts } from "./NewArrivalProducts";
import DiscountBanner from "../home/DiscountBanner";
import Footer from "../../components/layout/Footer/Footer";
import { ShoppingCategoryProduct } from "../home/ShoppingCategoryProduct";

const ShoppingHome = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getSliderBannerImages().then((response) => {
      setBannerImages(response.Data);
    });
    getAllCategories().then((response) => {
      setCategories(response.Data.Categories);
    });
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
      partialVisibilityGutter: 30,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      partialVisibilityGutter: 10,
    },
  };
console.log(categories, "categories")
  const shoppingCategoryBar = () => (
    <>
      <div class="section shopping-catagory-nav mt-5">
        <div class="container-fluid">
          <div class="row d-none d-sm-block">
            <div class="col-md-12">
              <div class="shopping-catagory-nav-outer">
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  className="container"
                >
                  {categories &&
                    categories.map((c, i) =>
                      c.Name == "Exclusive/Membership" ? null : (
                        <div class="shopping-catagory-box">
                          <Link to={`/shopping/${c.Name}/${c.Id}`}>
                            <img
                              src={
                                `http://shopadmin.vipswallet.com/Content/Images/categories/` +
                                c.ImageUrl
                              }
                            />
                            <span class="shopping-catagory-box-title">
                              {c.Name}
                            </span>
                          </Link>
                        </div>
                      )
                    )}
                </Carousel>
              </div>
            </div>
          </div>

          {/* -- catagorie nav for mobile view start -- */}
          <div class="row d-block d-sm-none">
            <div class="col-md-12">
              <div class="shopping-catagory-nav-outer catagory-nav-scroller">
                {categories &&
                  categories.map((c, i) =>
                    c.Name == "Exclusive/Membership" ? null : (
                      <div class="shopping-catagory-box">
                        <Link to={`/shopping/${c.Name}/${c.Id}`}>
                          <img
                            src={
                              `http://shopadmin.vipswallet.com/Content/Images/categories/` +
                              c.ImageUrl
                            }
                          />
                          <span class="shopping-catagory-box-title">
                            {c.Name}
                          </span>
                        </Link>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
          {/* -- catagorie nav for mobile view end -- */}
        </div>
      </div>
    </>
  );

  return (
    <>
      {shoppingCategoryBar()}

      <TopSlider banners={bannerImages} id={5} />
      <DealsofTheDay />
      {/* <TopDeals /> */}
      <ShoppingCategoryProduct
        title="VIPS"
        subtitle=" Promotional"
        categoryId={11}
        description="Discover all the VIPS merchandise here!"
      />
      {/* <Trending /> */}
      <NewArrivalProducts />
      <DiscountBanner />
      <ShoppingCategoryProduct
        title={"Fashion"}
        categoryId={fashionCategoryId}
        description="Select your shopping product from a variety of categories and goods."
      />
      <ShoppingCategoryProduct
        title={"Electronics"}
        categoryId={electronicCategoryId}
        description="Best electronic devices at affordable prices with great offers."
      />
      {/* <InspiredByBrowsingHistory />  */}
      {/* <Footer /> */}
    </>
  );
};

export default ShoppingHome;
