import { useState } from "react";
import { useProducts } from "../../../../../context/ProductContext";
import { Product } from "../../../../../utils/types";

type Props = { id: number; handleCancel: () => void };

const DiscountScreen = (props: Props) => {
  const [value, setValue] = useState("");
  const products = useProducts();
  const handleChange = (e: any) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setValue(newValue);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newLamp: Partial<Product> = {
      percentOff: Number(value),
    };
    await products?.update(props.id, newLamp);
  };
  return (
    <div className="fixed inset-0 opacity-80 bg-black z-10 p-8">
      <div className="flex items-center justify-center h-full">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              onChange={handleChange}
              value={value + "%"}
              placeholder="Procent Redus"
              aria-label="Full name"
            />
            <input
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
              value="Add Discount"
            />
            <button
              onClick={props.handleCancel}
              className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiscountScreen;
