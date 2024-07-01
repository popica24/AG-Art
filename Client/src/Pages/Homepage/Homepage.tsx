import "./index.css";
import HorizontalCarousel from "./Components/HorizontalCarousel";
import AboutUs from "./Components/AboutUs";
import ProductShowcase from "./Components/ProductShowcase";
import Banners from "./Components/Banners";
import { useEffect } from "react";
const Homepage = () => {
  useEffect(() => {
    document.title = "AG Art | Homepage";
  }, []);
  return (
    <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
      <div className="flex justify-start container mx-auto px-8">
        <span className="text-xl md:text-3xl md:text-start text-center w-full font-thin uppercase py-5">
          Șlefuim lumina în artă.
        </span>
      </div>
      <div className="md:h-[80vh]">
        <div className="z-40 relative">
          <Banners />
        </div>
        <div
          data-aos="fade-down"
          data-aos-delay="1000"
          data-aos-easing="ease-in-sine"
          className="w-full flex items-center justify-center"
        >
          <img src="/pointingdown.gif" alt="" className="z-0" />
        </div>
      </div>
      <HorizontalCarousel />
      <AboutUs />
      <ProductShowcase />
    </div>
  );
};

export default Homepage;
