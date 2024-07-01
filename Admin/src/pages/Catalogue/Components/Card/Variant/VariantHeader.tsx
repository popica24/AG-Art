import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddVariant from "./AddVariant";

type Props = {
  id: number;
};

const VariantHeader = (props: Props) => {
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  return (
    <>
      <span
        className="relative w-full"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Variatii
        {hover && (
          <AiOutlinePlus
            onClick={() => setEdit(true)}
            className="absolute size-[18px] right-6 top-[4px] cursor-pointer"
          />
        )}
      </span>
      {edit && <AddVariant id={props.id} handleClose={() => setEdit(false)} />}
    </>
  );
};

export default VariantHeader;
