import React, { useState } from "react";
import { useProducts } from "../../../../context/ProductContext";
import { Product } from "../../../../utils/types";
import { CategoryToInt } from "../../../../utils/CategoryToInt";
import { IntToCategory } from "../../../../utils/IntToCategory";
import { BiCheck } from "react-icons/bi";

type Props = {
  id: number;
  name: string;
  categoryId: number;
};

const CategoryRow = (props: Props) => {
  const productRepo = useProducts();
  const [value, setValue] = useState(props.name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newLamp: Partial<Product> = {
      categoryId: CategoryToInt(value),
    };
    await productRepo?.update(props.id, newLamp);
  };
  return (
    <li>
      <form
        onSubmit={handleSubmit}
        className="inline-flex items-center w-full relative whitespace-nowrap"
      >
        Categorie -{" "}
        <div className="relative min-w-[200px]">
          <select
            id="confirm-category-update"
            onChange={(e) => setValue(e.target.value)}
            className="peer h-full w-full rounded-[7px] bg-transparent text-sm text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900  focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          >
            <option
              selected={IntToCategory(props.categoryId) == "pendule"}
              className="text-black"
              value="pendule"
            >
              Pendule
            </option>
            <option
              selected={IntToCategory(props.categoryId) == "lampadare-de-podea"}
              className="text-black"
              value="lampadare-de-podea"
            >
              Lampadare de podea
            </option>
            <option
              selected={IntToCategory(props.categoryId) == "lampi-de-masa"}
              className="text-black"
              value="lampi-de-masa"
            >
              Lampi de masa
            </option>
            <option
              selected={IntToCategory(props.categoryId) == "abajururi-din-lemn"}
              className="text-black"
              value="abajururi-din-lemn"
            >
              Abajururi din lemn
            </option>
            <option
              selected={IntToCategory(props.categoryId) == "aplice-de-perete"}
              className="text-black"
              value="aplice-de-perete"
            >
              Aplice de perete
            </option>
            <option
              selected={IntToCategory(props.categoryId) == "becuri"}
              className="text-black"
              value="becuri"
            >
              Becuri
            </option>
            <option
              selected={IntToCategory(props.categoryId) == "tablouri-din-lemn"}
              className="text-black"
              value="tablouri-din-lemn"
            >
              Tablouri din lemn
            </option>
            <option
              selected={IntToCategory(props.categoryId) == "articole-sezoniere"}
              className="text-black"
              value="articole-sezoniere"
            >
              Articole sezoniere
            </option>
          </select>
        </div>
        {value !== props.name && (
          <button type="submit">
            <BiCheck />
          </button>
        )}
      </form>
    </li>
  );
};

export default CategoryRow;
