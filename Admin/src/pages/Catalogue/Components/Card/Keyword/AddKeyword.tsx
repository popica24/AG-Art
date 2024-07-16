import { useState } from "react";
import { useProducts } from "../../../../../context/ProductContext";
import { toast } from "react-toastify";
import PopupContainer from "../../../../../components/PopupContainer";
import { Product } from "../../../../../utils/types";

type Props = {
  id: number;
  keywords: string[];
  categoryId: number;
  handleClose: () => void;
};

const AddKeyword = (props: Props) => {
  const products = useProducts();
  const [keyword, setKeyword] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (keyword.trim() !== "") {
      try {
        const newLamp: Partial<Product> = {
          keywords: [...props.keywords, keyword.trim()],
          categoryId: props.categoryId,
        };
        await products?.update(props.id, newLamp);
        setKeyword("");
        toast.success("✅🔑Cuvant cheie adaugat !");
      } catch (err: any) {
        toast.error("🤕 A aparut o eroare : " + err);
      }
    }
  };
  return (
    <PopupContainer
      handleClose={props.handleClose}
      title="Keywords"
      subtitle="Add Keyword"
      wrapperClass="w-fit"
    >
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="w-full px-8">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-product-height"
          >
            Keyword
          </label>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-product-height"
            type="text"
            placeholder="wood"
          />
        </div>
        <div className="w-full text-center">
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </PopupContainer>
  );
};

export default AddKeyword;
