import { useState } from "react";
import { IoIosRemove } from "react-icons/io";
import { toast } from "react-toastify";
import { Product } from "../../../../../utils/types";
import { useProducts } from "../../../../../context/ProductContext";

type Props = {
  id: number;
  name: string;
  parent: keyof Product;
  newArr: Array<string>;
};

const KeywordRow = (props: Props) => {
  const products = useProducts();
  const [hover, setHover] = useState(false);

  const handleRemove = async () => {
    try {
      const newLamp: Partial<Product> = {
        [props.parent]: props.newArr,
      };
      await products?.update(props.id, newLamp);
    } catch (err: any) {
      toast.error("🤕 A aparut o eroare : " + err);
    }
  };

  return (
    <li>
      <form
        className="inline-flex items-center w-full relative whitespace-nowrap"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span>{props.name}</span>
        {hover && (
          <IoIosRemove
            className="absolute size-[18px] right-0 cursor-pointer"
            onClick={handleRemove}
          />
        )}
      </form>
    </li>
  );
};

export default KeywordRow;
