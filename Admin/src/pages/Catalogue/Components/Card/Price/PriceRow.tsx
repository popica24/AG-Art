import { useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDiscount } from "react-icons/md";
import { toast } from "react-toastify";
import DiscountScreen from "./DiscountScreen";
import { useProducts } from "../../../../../context/ProductContext";
import { Product } from "../../../../../utils/types";

type Props = {
  price: number;
  id: number;
};

const PriceRow = (props: Props) => {
  const products = useProducts();
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [discountScren, setDiscountScreen] = useState(false);
  const [value, setValue] = useState(props.price);
  const inputRef = useRef<any>(undefined);

  const handleCancel = () => {
    setDiscountScreen(false);
  };

  const handleFocus = () => {
    if (inputRef.current) {
      setEdit(true);
      inputRef.current.focus();
    }
  };
  const handleChange = (e: any) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setValue(newValue);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const newLamp: Partial<Product> = {
        price: value,
      };

      await products?.update(props.id, newLamp);

      toast.success("💸💸 Pretul a fost modificat !");
    } catch (err: any) {
      toast.error("🤕 A aparut o eroare : " + err);
    }
  };
  return (
    <>
      <li>
        <form
          className="inline-flex items-center w-full relative whitespace-nowrap"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onSubmit={handleSubmit}
        >
          <span>
            Pret original :{" "}
            <input
              ref={inputRef}
              type="text"
              value={value + "RON"}
              onChange={handleChange}
              className="focus:border-0 focus:outline-0 bg-transparent"
              readOnly={!edit}
            />
          </span>

          {hover && (
            <>
              <CiEdit
                className="absolute size-[18px] right-0 cursor-pointer"
                onClick={handleFocus}
              />
              {/* <Tooltip content="Quick Coupon">
              
            </Tooltip> */}
              <MdDiscount
                className="absolute size-[18px] right-10 cursor-pointer"
                onClick={() => setDiscountScreen(true)}
              />
            </>
          )}
        </form>
      </li>
      {discountScren && (
        <DiscountScreen id={props.id} handleCancel={handleCancel} />
      )}
    </>
  );
};

export default PriceRow;
