import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import PopupContainer from "../../../../components/PopupContainer";
import { useProducts } from "../../../../context/ProductContext";
import { Product } from "../../../../utils/types";

type Props = {
  id: number;
  description: string;
  field: string;
  value: string;
};

const DescriptionRow = (props: Props) => {
  const products = useProducts();
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(props.value);

  const handleFocus = () => {
    setEdit(true);
  };

  const handleSubmit = async () => {
    const newLamp: Partial<Product> = {
      description: value,
    };
    await products?.update(props.id, newLamp);
  };

  return (
    <li>
      <div
        className="inline-flex items-center w-full relative whitespace-nowrap"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span>
          {props.field}
          {" - "}
          <span className="focus:border-0 focus:outline-0 bg-transparent">
            {props.description}
          </span>
        </span>

        {hover && (
          <CiEdit
            className="absolute size-[18px] right-0 cursor-pointer"
            onClick={handleFocus}
          />
        )}

        {edit && (
          <PopupContainer
            width="w-full"
            wrapperClass="max-w-[70vw]"
            title="Description"
            subtitle="Change Description"
            handleClose={() => setEdit(false)}
          >
            <div className="flex flex-col my-4">
              <textarea
                className="container mx-auto px-8 font-light text-xl whitespace-break-spaces max-h-[200px] min-h-[200px] border-2 shadow-xl"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                {value}
              </textarea>
              <button
                onClick={() => handleSubmit()}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Submit
              </button>
            </div>
          </PopupContainer>
        )}
      </div>
    </li>
  );
};

export default DescriptionRow;
