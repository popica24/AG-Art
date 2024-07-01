import { useState } from "react";
import DiscountedProducts from "./Components/DiscountedProducts";
import DiscountCreate from "./Components/DiscountCreate";

const DiscountManager = () => {
  const [panel, setPanel] = useState(1);

  return (
    <div className="flex flex-col text-center bg-black text-white min-h-screen ">
      <h1 className="text-4xl font-thin my-10" data-aos="zoom-out">
        Manager Reduceri
      </h1>

      <div className="flex flex-row container mx-auto" data-aos="zoom-out">
        <span
          className={`text-3xl cursor-pointer font-thin my-10 text-start border-b text-white ${
            panel == 1 ? "border-white" : "border-black"
          }`}
          onClick={() => setPanel(1)}
        >
          Produse reduse
        </span>
        <span
          className={`text-3xl ms-4 cursor-pointer font-thin my-10 text-start border-b text-white ${
            panel == 2 ? "border-white" : "border-black"
          }`}
          onClick={() => setPanel(2)}
        >
          Reducere noua
        </span>
      </div>
      {panel == 1 ? <DiscountedProducts /> : <DiscountCreate />}
    </div>
  );
};

export default DiscountManager;
