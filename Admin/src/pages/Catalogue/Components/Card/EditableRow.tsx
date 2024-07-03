import React, { useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Product } from "../../../../utils/types";
import { useProducts } from "../../../../context/ProductContext";
type Props = {
  id: number;
  name: string | number;
  field: string;
  propName: keyof Product;
  categoryId: number;
};

const EditableRow = (props: Props) => {
  const productRepo = useProducts();
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(props.name);
  const inputRef = useRef<any>(undefined);

  const handleFocus = () => {
    if (inputRef.current) {
      setEdit(true);
      inputRef.current.focus();
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newLamp: Partial<Product> = {
      [props.propName]: value,
      categoryId: props.categoryId,
    };
    await productRepo?.update(props.id, newLamp);
  };
  return (
    <li>
      <form
        onSubmit={handleSubmit}
        className="inline-flex items-center w-full relative whitespace-nowrap"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span>
          {props.field}
          {" - "}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="focus:border-0 focus:outline-0 bg-transparent"
            readOnly={!edit}
          />
        </span>
        {hover && (
          <CiEdit
            className="absolute size-[18px] right-0 cursor-pointer"
            onClick={handleFocus}
          />
        )}
      </form>
    </li>
  );
};

export default EditableRow;
