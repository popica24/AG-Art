import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddKeyword from "./AddKeyword";

type Props = {
  id: number;
  keywords: string[];
};

const KeywordHeader = (props: Props) => {
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  return (
    <>
      <span
        className="relative w-full"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Cuvinte Cheie
        {hover && (
          <AiOutlinePlus
            onClick={() => setEdit(true)}
            className="absolute size-[18px] right-6 top-[4px] cursor-pointer"
          />
        )}
      </span>
      {edit && (
        <AddKeyword
          id={props.id}
          keywords={props.keywords}
          handleClose={() => setEdit(false)}
        />
      )}
    </>
  );
};

export default KeywordHeader;
